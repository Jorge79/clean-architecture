import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ListProductUseCase from "./list.product.usecase";

describe("Test find product use case", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should list the products", async () => {
    const productRepository = new ProductRepository();
    const usecase = new ListProductUseCase(productRepository);
    const product = new Product("123", "Product 1", 10.99, "a");
    const product2 = new Product("1234", "Product 2", 1.99, "b");

    await productRepository.create(product);
    await productRepository.create(product2);

    const output = {
      products: [
        {
          id: "123",
          name: "Product 1",
          price: 10.99,
          type: "a",
        },
        {
          id: "1234",
          name: "Product 2",
          price: 1.99,
          type: "b",
        },
      ],
    };

    const result = await usecase.execute();

    expect(result).toEqual(output);
  });
});
