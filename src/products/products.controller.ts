import { Request, Response } from "express";
import { BaseProduct, Product } from "./product.interface";
import { productService } from "./products.service";

export const getAll = async (req: Request, res: Response) => {
  try {
    const items = await productService.findAll();

    res.status(200).send(items);
  } catch (e: any) {
    res.status(500).send(e.message);
  }
};

export const get = async (req: Request, res: Response) => {
  const id: string = req.params.id;

  try {
    const product: Product = await productService.find(id);

    if (product) {
      return res.status(200).send(product);
    }

    res.status(404).send({ message: "Product not found" });
  } catch (e: any) {
    res.status(500).send(e.message);
  }
};

export const post = async (req: Request, res: Response) => {
  try {
    const product: BaseProduct = req.body;

    const newProduct = await productService.create(product);

    res.status(201).json(newProduct);
  } catch (e: any) {
    res.status(500).send(e.message);
  }
};

export const update = async (req: Request, res: Response) => {
  const id: string = req.params.id;

  try {
    const productUpdate: Pick<Product, "stock"> = req.body;

    const existingProduct: Product = await productService.find(id);

    if (existingProduct) {
      const updatedItem = await productService.update(id, productUpdate);
      return res.status(200).json(updatedItem);
    }

    res.status(404).send({ message: "Product not found" });
  } catch (e: any) {
    res.status(500).send(e.message);
  }
};

export const productController = { getAll, get, post, update };
