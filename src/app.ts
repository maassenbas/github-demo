import "express-async-errors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import { errorHandler } from "./middleware/errorHandler";
import userRouter from "./routes/userRoutes";

const app = express();
app.use(helmet());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/users", userRouter);

app.use(errorHandler);

export default app;
