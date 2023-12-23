import Validator from "validatorjs";
import { Request, Response, NextFunction } from "express";
import { ResponseData } from "../../helpers";
import User from "../../db/models/User";

class UserValidation {
  public async signUp(req: Request, res: Response, next: NextFunction) {
    try {
      const rules: Validator.Rules = {
        firstName: "required|string",
        lastName: "required|string",
        email: "required|email",
        password: "required|string",
      };

      const validator = new Validator(req.body, rules);

      if (validator.fails()) {
        return res
          .status(400)
          .send(
            ResponseData(400, "Validation error", null, validator.errors.errors)
          );
      }

      const user = await User.findOne({
        where: {
          email: req.body.email,
        },
      });

      if (user) {
        return res
          .status(400)
          .send(ResponseData(400, "Email already exists", null, null));
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
  }

  public async signIn(req: Request, res: Response, next: NextFunction) {
    try {
      const rules: Validator.Rules = {
        email: "required|email",
        password: "required|string",
      };

      const validator = new Validator(req.body, rules);

      if (validator.fails()) {
        return res
          .status(400)
          .send(
            ResponseData(400, "Validation error", null, validator.errors.errors)
          );
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
  }
}

export default UserValidation;
