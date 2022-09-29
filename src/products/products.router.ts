 import express, { Request, Response } from "express";
 import * as ProductService from "./products.service";
 import { BaseProduct, Product } from "./product.interface";

 export const productsRouter = express.Router();

productsRouter.get("/", async (req: Request, res: Response) => {
    try {
      const items = await ProductService.findAll();
  
      res.status(200).send(items);
    } catch (e: any) {
      res.status(500).send(e.message);
    }
});

productsRouter.get("/:id", async (req: Request, res: Response) => {
    const id: string = req.params.id
  
    try {
      const product: Product = await ProductService.find(id);
  
      if (product) {
        return res.status(200).send(product);
      }
  
      res.status(404).send("product not found");
    } catch (e: any) {
      res.status(500).send(e.message);
    }
});

productsRouter.post("/", async (req: Request, res: Response) => {
    try {
      const product: BaseProduct = req.body;
  
      const newProduct = await ProductService.create(product);
  
      res.status(201).json(newProduct);
    } catch (e: any) {
      res.status(500).send(e.message);
    }
});

productsRouter.patch("/:id", async (req: Request, res: Response) => {
    const id: string = req.params.id
  
    try {
      const productUpdate: Pick<Product, 'stock'> = req.body;
  
      const existingProduct: Product = await ProductService.find(id);
  
      if (existingProduct) {
        const updatedItem = await ProductService.update(id, productUpdate);
        return res.status(200).json(updatedItem);
      }
  
      res.status(404).send("product not found");
    } catch (e: any) {
      res.status(500).send(e.message);
    }
  });