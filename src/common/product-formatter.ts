import { Product, ProductFormatted } from "../api/products/product";

export const productFormatter = (product: Product): ProductFormatted => {
  return {
    ...product,
    price: `${product.price.amount} ${product.price.currency}`,
  };
};
