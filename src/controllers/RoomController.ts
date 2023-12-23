import { Request, Response } from "express";
import Room from "../db/models/Room";

class RoomController {
  public async index(req: Request, res: Response): Promise<Response> {
    try {
      const rooms = await Room.findAll();

      return res.status(200).send({
        status: 200,
        message: "Rooms retrieved successfully",
        data: rooms,
      });
    } catch (error: any) {
      if (error instanceof Error) {
        return res.status(400).send({
          status: 400,
          message: error.message,
        });
      }

      return res.status(500).send({
        status: 500,
        message: "Internal server error",
        errors: error,
      });
    }
  }

  public async show(req: Request, res: Response): Promise<Response> {
    try {
      const room = await Room.findByPk(req.params.id);

      if (!room) {
        return res.status(404).send({
          status: 404,
          message: "Room not found",
        });
      }

      return res.status(200).send({
        status: 200,
        message: "Room retrieved successfully",
        data: room,
      });
    } catch (error: any) {
      if (error instanceof Error) {
        return res.status(400).send({
          status: 400,
          message: error.message,
        });
      }

      return res.status(500).send({
        status: 500,
        message: "Internal server error",
        errors: error,
      });
    }
  }

  public async store(req: Request, res: Response): Promise<Response> {
    try {
      const room = await Room.create(req.body);

      return res.status(201).send({
        status: 201,
        message: "Room created successfully",
        data: room,
      });
    } catch (error: any) {
      if (error instanceof Error) {
        return res.status(400).send({
          status: 400,
          message: error.message,
        });
      }

      return res.status(500).send({
        status: 500,
        message: "Internal server error",
        errors: error,
      });
    }
  }

  public async update(req: Request, res: Response): Promise<Response> {
    try {
      const room = await Room.findByPk(req.params.id);

      if (!room) {
        return res.status(404).send({
          status: 404,
          message: "Room not found",
        });
      }

      await room.update(req.body);

      return res.status(200).send({
        status: 200,
        message: "Room updated successfully",
        data: room,
      });
    } catch (error: any) {
      if (error instanceof Error) {
        return res.status(400).send({
          status: 400,
          message: error.message,
        });
      }

      return res.status(500).send({
        status: 500,
        message: "Internal server error",
        errors: error,
      });
    }
  }
}

export default RoomController;
