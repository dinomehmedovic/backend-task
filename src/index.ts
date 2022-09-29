 import * as dotenv from "dotenv";
 import express from "express";
import { createConnection } from "./db";
 import { productsRouter } from "./products/products.router";

 dotenv.config();

 if (!process.env.PORT) {
    process.exit(1);
 }
 
 const PORT: number = parseInt(process.env.PORT as string, 10);
 const app = express();
 app.use(express.json());
 app.use("/products", productsRouter);

 createConnection()
 
 app.listen(PORT || 3000, () => {
    console.log(`Listening on port ${PORT}`);
});