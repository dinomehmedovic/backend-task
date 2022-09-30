import express from "express";
import { createValidator } from 'express-joi-validation'
import { productSchema } from "../schemas/product-schema";
import { productController } from "./products.controller";

export const productsRouter = express.Router();

productsRouter.get("/", productController.getAll);
productsRouter.get("/:id", productController.get);
productsRouter.post("/", createValidator().body(productSchema.create), productController.post);
productsRouter.patch("/:id", createValidator().body(productSchema.update), productController.update);