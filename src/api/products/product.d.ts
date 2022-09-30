export type Price = {
  amount: number;
  currency: string;
};

export type BaseProduct = {
  name: string;
  price: Price;
  stock: number;
};

export type Product = BaseProduct & { id: string };

export type ProductFormatted = Omit<Product, "price"> & { price: string };
