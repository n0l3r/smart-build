import express from 'express';
import { RoomController } from '../controllers';
import { Authorization } from '../middleware';
import { RoomUpdateValidation, RoomValidation } from '../middleware/validation';

const roomRoutes = express.Router();

const roomController = new RoomController();

roomRoutes.get('/', Authorization, roomController.index);
roomRoutes.get('/:id', Authorization, roomController.show);
roomRoutes.post('/', Authorization, RoomValidation, roomController.store);
roomRoutes.put('/:id', Authorization, RoomUpdateValidation, roomController.update);

export default roomRoutes;