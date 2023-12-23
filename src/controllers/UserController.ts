import { Request, Response } from "express";
import User from "../db/models/User";
import { ResponseData, PasswordHelper, GenerateToken } from "../helpers";

const passwordHelper = new PasswordHelper();

class UserController {
  public async signUp(req: Request, res: Response): Promise<Response> {
    try {
      const password = await passwordHelper.hash(req.body.password);
      const user = await User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: password,
      });

      return res
        .status(201)
        .send(ResponseData(201, "User created successfully", user, null));
    } catch (error: any) {
      if (error instanceof Error) {
        return res
          .status(400)
          .send(ResponseData(400, error.message, null, error));
      }

      return res
        .status(500)
        .send(ResponseData(500, "Internal server error", null, error));
    }
  }

  public async signIn(req: Request, res: Response): Promise<Response> {
    try {
      const user = await User.findOne({
        where: {
          email: req.body.email,
        },
      });

      if (!user) {
        return res
          .status(400)
          .send(ResponseData(400, "Email not found", null, null));
      }

      const passwordMatch = await passwordHelper.compare(
        req.body.password,
        user.password
      );

      if (!passwordMatch) {
        return res
          .status(400)
          .send(ResponseData(400, "Password is incorrect", null, null));
      }

      const generateToken = new GenerateToken();

      const dataUser = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      };

      const token = await generateToken.generate(dataUser);
      const refreshToken = await generateToken.refresh(dataUser);

      user.accessToken = token;
      await user.save();

      res.cookie("refreshToken", refreshToken, {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: true,
        sameSite: "none",
      });

      const responseUser = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        token: token,
      };

      return res
        .status(200)
        .send(
          ResponseData(200, "User signed in successfully", responseUser, null)
        );
    } catch (error: any) {
      if (error instanceof Error) {
        return res
          .status(400)
          .send(ResponseData(400, error.message, null, error));
      }

      return res
        .status(500)
        .send(ResponseData(500, "Internal server error", null, error));
    }
  }

  public async refreshToken(req: Request, res: Response): Promise<Response> {
    try {
      const refreshToken = req.cookies?.refreshToken;

      if (!refreshToken) {
        return res
          .status(401)
          .send(ResponseData(401, "Unauthorized", null, null));
      }

      const generateToken = new GenerateToken();
      const payload = await generateToken.verifyRefresh(refreshToken);

      if (!payload) {
        return res
          .status(401)
          .send(ResponseData(401, "Unauthorized", null, null));
      }

      const user = await User.findOne({
        where: {
          id: payload.id,
        },
      });

      if (!user) {
        return res
          .status(401)
          .send(ResponseData(401, "Unauthorized", null, null));
      }

      const dataUser = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      };

      const token = await generateToken.generate(dataUser);
      const newRefreshToken = await generateToken.refresh(dataUser);

      user.accessToken = token;
      await user.save();

      res.cookie("refreshToken", newRefreshToken, {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: true,
        sameSite: "none",
      });

      const responseUser = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        token: token,
      };

      return res
        .status(200)
        .send(
          ResponseData(200, "User signed in successfully", responseUser, null)
        );
    } catch (error: any) {
      if (error instanceof Error) {
        return res
          .status(400)
          .send(ResponseData(400, error.message, null, error));
      }

      return res
        .status(500)
        .send(ResponseData(500, "Internal server error", null, error));
    }
  }

  public async signOut(req: Request, res: Response): Promise<Response> {
    try {
      const refreshToken = req.cookies?.refreshToken;

      if (!refreshToken) {
        return res
          .status(401)
          .send(ResponseData(401, "Unauthorized", null, null));
      }

      const generateToken = new GenerateToken();
      const payload = await generateToken.verifyRefresh(refreshToken);

      if (!payload) {
        return res
          .status(401)
          .send(ResponseData(401, "Unauthorized", null, null));
      }

      const user = await User.findOne({
        where: {
          id: payload.id,
        },
      });

      if (!user) {
        return res
          .status(401)
          .send(ResponseData(401, "Unauthorized", null, null));
      }

      user.accessToken = null;
      await user.save();

      res.clearCookie("refreshToken");

      return res
        .status(200)
        .send(ResponseData(200, "User signed out successfully", null, null));
    } catch (error: any) {
      if (error instanceof Error) {
        return res
          .status(400)
          .send(ResponseData(400, error.message, null, error));
      }

      return res
        .status(500)
        .send(ResponseData(500, "Internal server error", null, error));
    }
  }

  public async userDetail(req: Request, res: Response): Promise<Response> {
    try {
      const id = res.locals.user.id;
      const user = await User.findOne({
        where: {
          id: id,
        },
      });

      if (!user) {
        return res
          .status(404)
          .send(ResponseData(404, "User not found", null, null));
      }

      return res.status(200).send(ResponseData(200, "User detail", user, null));
    } catch (error: any) {
      if (error instanceof Error) {
        return res
          .status(400)
          .send(ResponseData(400, error.message, null, error));
      }

      return res
        .status(500)
        .send(ResponseData(500, "Internal server error", null, error));
    }
  }
}

export default UserController;
