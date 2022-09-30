import express from "express";
import { createValidator } from "express-joi-validation";
import { productSchema } from "../../schemas/product-schema";
import { productsController } from "./products.controller";

export const productsRouter = express.Router();

productsRouter.get("/", productsController.getAll);
productsRouter.get("/:id", productsController.get);
productsRouter.post(
  "/",
  createValidator().body(productSchema.create),
  productsController.post
);
productsRouter.patch(
  "/:id",
  createValidator().body(productSchema.update),
  productsController.update
);
