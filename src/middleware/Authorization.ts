import { Request, Response, NextFunction } from "express";
import { ResponseData, GenerateToken } from "../helpers";
import User from "../db/models/User";

const Authorization = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authorization = req.headers.authorization;

    if (!authorization) {
      return res
        .status(401)
        .send(ResponseData(401, "Unauthorized", null, null));
    }

    const token = authorization.split(" ")[1];
    console.log(token);
    if (!token) {
      return res
        .status(401)
        .send(ResponseData(401, "Unauthorized", null, null));
    }

    const generateToken = new GenerateToken();
    const payload = await generateToken.verify(token!);

    if (!payload) {
      return res
        .status(401)
        .send(ResponseData(401, "Unauthorized", null, null));
    }

    res.locals.user = payload;

    const user = await User.findOne({
      where: {
        id: payload.id,
      },
    });

    console.log(user?.accessToken);

    if (!user?.accessToken || user?.accessToken !== token) {
      return res
        .status(401)
        .send(ResponseData(401, "Unauthorized", null, null));
    }

    return next();
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
};

export default Authorization;
