import { getProducts } from "../db";
import { BaseProduct, Product } from "./product.interface";
import { v4 as uuidv4 } from "uuid";

export const findAll = async (): Promise<Product[]> => {
  return getProducts().value();
};

export const find = async (id: string): Promise<Product> => {
  return getProducts().find({ id }).value();
};

export const create = async (product: BaseProduct): Promise<Product> => {
  const newProduct: Product = { id: uuidv4(), ...product };
  getProducts().push(newProduct).write();
  return newProduct;
};

export const update = async (
  id: string,
  updatedProduct: Pick<Product, "stock">
): Promise<Product> => {
  return getProducts().find({ id }).assign(updatedProduct).write();
};

export const productService = { findAll, find, create, update };
