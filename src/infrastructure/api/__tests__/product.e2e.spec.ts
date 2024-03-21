import { sequelize, app } from "../express";
import request from "supertest";

describe("E2E test for product", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should create a product", async () => {
    const response = await request(app).post("/product").send({
      name: "Product",
      price: 9.99,
      type: "a",
    });

    expect(response.status).toBe(200);
    expect(response.body.name).toBe("Product");
    expect(response.body.price).toBe(9.99);
    expect(response.body.type).toBe("a");
  });

  it("should not create a product", async () => {
    const response = await request(app).post("/product").send({
      name: "Product",
    });
    expect(response.status).toBe(500);
  });

  it("should list all products", async () => {
    const response = await request(app).post("/product").send({
      name: "Product 1",
      price: 9.99,
      type: "a",
    });
    expect(response.status).toBe(200);

    const response2 = await request(app).post("/product").send({
      name: "Product 2",
      price: 1.99,
      type: "b",
    });
    expect(response2.status).toBe(200);

    const listResponse = await request(app).get("/product").send();
    expect(listResponse.status).toBe(200);
    expect(listResponse.body.products.length).toBe(2);

    const product = listResponse.body.products[0];
    expect(product.name).toBe("Product 1");
    expect(product.price).toBe(9.99);
    expect(product.type).toBe("a");

    const product2 = listResponse.body.products[1];
    expect(product2.name).toBe("Product 2");
    expect(product2.price).toBe(3.98);
    expect(product2.type).toBe("b");
  });
});
