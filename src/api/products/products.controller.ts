import { Request, Response } from "express";
import { productFormatter } from "../../common/product-formatter";
import { BaseProduct, Product } from "./product.interface";
import { productService } from "./products.service";

export const getAll = async (req: Request, res: Response) => {
  try {
    const products = await productService.findAll();

    res.status(200).send(products.map((product) => productFormatter(product)));
  } catch (e: any) {
    res.status(500).send(e.message);
  }
};

export const get = async (req: Request, res: Response) => {
  const id: string = req.params.id;

  try {
    const product: Product = await productService.find(id);

    if (product) {
      return res.status(200).send(productFormatter(product));
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
      const updatedProduct = await productService.update(id, productUpdate);
      return res.status(200).json(updatedProduct);
    }

    res.status(404).send({ message: "Product not found" });
  } catch (e: any) {
    res.status(500).send(e.message);
  }
};

export const productController = { getAll, get, post, update };
