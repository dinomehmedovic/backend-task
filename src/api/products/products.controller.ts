import { NextFunction, Request, Response } from "express";
import { Product, ProductFormatted } from "./product";
import { productsService } from "./products.service";

export const getAll = async (req: Request, res: Response) => {
  try {
    const products = await productsService.findAll();
    res.status(200).send(products);
  } catch (e: any) {
    res.status(500).send(e.message);
  }
};

export const get = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id: string = req.params.id;
    const product: ProductFormatted = await productsService.find(id);

    return res.status(200).send(product);
  } catch (e: unknown) {
    next(e);
  }
};

export const post = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newProduct = await productsService.create(req.body);

    res.status(201).json(newProduct);
  } catch (e: unknown) {
    next(e);
  }
};

export const update = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id: string = req.params.id;
    const productUpdate: Pick<Product, "stock"> = req.body;
    const updatedProduct = await productsService.update(id, productUpdate);

    res.status(200).json(updatedProduct);
  } catch (e: unknown) {
    next(e);
  }
};

export const productsController = { getAll, get, post, update };
