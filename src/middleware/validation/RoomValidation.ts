import Validator from "validatorjs";
import { Request, Response, NextFunction } from "express";
import { ResponseData } from "../../helpers";

const RoomValidation = (req: Request, res: Response, next: NextFunction) => {
  try {
    const rules: Validator.Rules = {
      name: "required|string",
      description: "required|string",
      status: "required|string",
      image: "required|string",
      people_count: "required|integer",
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
};

const RoomUpdateValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const rules: Validator.Rules = {
      name: "string",
      description: "string",
      status: "string",
      image: "string",
      people_count: "integer",
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
};

export { RoomValidation, RoomUpdateValidation };
