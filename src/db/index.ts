import path from "path";
import lowdb from "lowdb";
import FileSync from "lowdb/adapters/FileSync";
import { Product } from "../api/products/product.interface";

type Schema = {
  products: Product[];
};

let db: lowdb.LowdbSync<Schema>;

const defaultPath = path.join(__dirname, "..", "db", "products.json");

export const createConnection = async (file: string = defaultPath) => {
  const adapter = new FileSync<Schema>(file);
  db = lowdb(adapter);
};

export const getProducts = () => db.get("products");
