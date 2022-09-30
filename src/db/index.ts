import path from "path";
import lowdb from "lowdb";
import FileSync from "lowdb/adapters/FileSync";
import { Product } from "../products/product.interface";

type Schema = {
  products: Product[];
};

let db: lowdb.LowdbSync<Schema>;

export const createConnection = async () => {
  const adapter = new FileSync<Schema>(
    path.join(__dirname, "..", "db", "products.json")
  );
  db = lowdb(adapter);
};

export const getProducts = () => db.get("products");
