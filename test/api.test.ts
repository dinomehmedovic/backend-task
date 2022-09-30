import request from "supertest";
import path from "path";
import fs from "fs";
import { createConnection } from "../src/db";
import app from "../src/app";
import { BaseProduct, Product } from "../src/api/products/product.interface";

const prepareTestData = () => {
  try {
    const testData = fs.readFileSync(
      path.join(__dirname, "data", "products-test-data-const.json"),
      "utf-8"
    );
    fs.writeFileSync(
      path.join(__dirname, "data", "products-test-data.json"),
      testData
    );
  } catch (err) {
    console.error("Error while preparing test data");
  }
};

beforeEach(() => {
  prepareTestData();
  const testDataPath = path.join(__dirname, "data", "products-test-data.json");
  createConnection(testDataPath);
});

describe("GET /products", () => {
  it("should return status code 200", async () => {
    const response = await request(app).get("/api/products");
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(2);
  });

  it("should return product values with formatted price", async () => {
    const prices = ["429.99 SEK", "5999.99 SEK"];
    const response = await request(app).get("/api/products");
    response.body.forEach(
      (product: Omit<Product, "price"> & { price: string }, index: number) => {
        expect(product).toBeDefined();
        expect(product.price).toBe(prices[index]);
      }
    );
  });
});

describe("GET /products/:id", () => {
  it("should return status code 200", async () => {
    const response = await request(app).get(
      "/api/products/f74fb16e-62b2-4af1-abed-1a0516200d1b"
    );
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeDefined();
  });

  it("should return product by id with formatted price", async () => {
    const response = await request(app).get(
      "/api/products/014571de-30fc-4ae6-8d74-2f3641790e42"
    );
    expect(response.statusCode).toBe(200);
    expect(response.body.name).toBe("Dinning Table");
    expect(response.body.price).toBe("5999.99 SEK");
    expect(response.body.stock).toBe(1);
  });

  it("should return status code 404 product not found for non existing id", async () => {
    const response = await request(app).get("/api/products/id-dont-exist");
    expect(response.statusCode).toBe(404);
    expect(response.body.message).toBe("Product not found");
  });
});

describe("POST /products", () => {
  it("should return new product and status code 201", async () => {
    const newProduct: BaseProduct = {
      name: "Chair",
      price: {
        amount: 1000,
        currency: "SEK",
      },
      stock: 50,
    };
    const response = await request(app).post("/api/products").send(newProduct);
    expect(response.statusCode).toBe(201);
    expect(response.body.name).toBe(newProduct.name);
    expect(response.body.stock).toBe(newProduct.stock);
    expect(response.body.price.amount).toBe(newProduct.price.amount);
    expect(response.body.price.currency).toBe(newProduct.price.currency);
  });

  it("should return new product and status code 201", async () => {
    const newProduct: BaseProduct = {
      name: "Chair",
      price: {
        amount: 1000,
        currency: "SEK",
      },
      stock: 50,
    };
    const response = await request(app).post("/api/products").send(newProduct);
    expect(response.statusCode).toBe(201);
    expect(response.body.name).toBe(newProduct.name);
    expect(response.body.stock).toBe(newProduct.stock);
    expect(response.body.price.amount).toBe(newProduct.price.amount);
    expect(response.body.price.currency).toBe(newProduct.price.currency);
  });

  it("should return status 400 if name parameter is missing", async () => {
    const newProduct: Partial<BaseProduct> = {
      price: {
        amount: 1000,
        currency: "SEK",
      },
      stock: 50,
    };
    const response = await request(app).post("/api/products").send(newProduct);
    expect(response.statusCode).toBe(400);
  });
});

describe("PATCH /products/:id", () => {
  it("should return updated product and status code 20", async () => {
    const updatedProduct: Pick<BaseProduct, "stock"> = {
      stock: 500,
    };
    const response = await request(app)
      .patch("/api/products/014571de-30fc-4ae6-8d74-2f3641790e42")
      .send(updatedProduct);
    expect(response.statusCode).toBe(200);
    expect(response.body.name).toBe("Dinning Table");
    expect(response.body.stock).toBe(500);
  });

  it("should return status 400 if name parameter is sent", async () => {
    const updatedProduct: Partial<BaseProduct> = {
      name: "New name",
      stock: 500,
    };
    const response = await request(app)
      .patch("/api/products/014571de-30fc-4ae6-8d74-2f3641790e42")
      .send(updatedProduct);
    expect(response.statusCode).toBe(400);
  });
});
