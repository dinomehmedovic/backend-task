import { getProducts } from "../../db";
import { productFormatter } from "../../common/product-formatter";
import { BaseProduct, Product, ProductFormatted } from "./product";
import { v4 as uuidv4 } from "uuid";
import Errors from "../../common/errors";
import ApiError from "../../common/api-error";

export const findAll = async (): Promise<ProductFormatted[]> => {
  return getProducts()
    .value()
    .map((product) => productFormatter(product));
};

export const find = async (id: string): Promise<ProductFormatted> => {
  const product: Product = getProducts().find({ id }).value();

  if (!product) {
    throw new ApiError(Errors.PRODUCT_NOT_FOUND);
  }
  return productFormatter(product);
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
  const product: Product = getProducts().find({ id }).value();

  if (!product) {
    throw new ApiError(Errors.PRODUCT_NOT_FOUND);
  }

  return getProducts().find({ id }).assign(updatedProduct).write();
};

export const productsService = { findAll, find, create, update };
