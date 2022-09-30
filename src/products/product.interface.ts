export interface Price {
  amount: number;
  currency: string;
}

export interface BaseProduct {
  name: string;
  price: Price;
  stock: number;
}

export interface Product extends BaseProduct {
  id: string;
}
