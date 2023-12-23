import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { roomRoutes, userRoutes } from "./routes";
import swaggerUi from "swagger-ui-express";
import swaggerOutput from "./swagger_output.json";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use("/users", userRoutes);
app.use("/rooms", roomRoutes);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerOutput));
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
