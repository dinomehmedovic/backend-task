import * as dotenv from "dotenv";
import express from "express";
import { createConnection } from "./db";
import { productsRouter } from "./api/products/products.router";
import { errorHandler } from "./middleware/error.middleware";
import { notFoundHandler } from "./middleware/not-found.middleware";

dotenv.config();

if (!process.env.PORT) {
  process.exit(1);
}

const app = express();
app.use(express.json());
app.use("/api/products", productsRouter);

createConnection();

app.use(errorHandler);
app.use(notFoundHandler);

export default app;
