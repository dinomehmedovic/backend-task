import request from "supertest";
import app from "../app";
describe("GET /products", () => {
  it("should return status code 200", async () => {
    const response = await request(app).get("/api/products");
    expect(response.statusCode).toBe(200);
  });
});
