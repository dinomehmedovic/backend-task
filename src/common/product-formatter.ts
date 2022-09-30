import { Product } from "../api/products/product.interface";

export const productFormatter = (
  product: Product
): Omit<Product, "price"> & { price: string } => {
  return {
    ...product,
    price: `${product.price.amount} ${product.price.currency}`,
  };
};
