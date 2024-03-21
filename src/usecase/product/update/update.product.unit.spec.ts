import ProductFactory from "../../../domain/product/factory/product.factory";
import UpdateProductUseCase from "./update.product.usecase";

const product = ProductFactory.create("Product 1", 10.99, "a")

const input = {
  id: product.id,
  name: "Product updated",
  price: 9.99,
  type: "a"
}

const MockRepository = () => {
  return {
    create: jest.fn(),
    findAll: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
    update: jest.fn()
  }
}


describe("Unit test for product update use case", () => {
  it("should create a product", async () => {
    const productRepository = MockRepository();
    const productUpdateUsecase = new UpdateProductUseCase(productRepository)
    
    const output = await productUpdateUsecase.execute(input)
    expect(output).toEqual({
      id: expect.any(String),
      name: input.name,
      price: input.price,
      type: input.type
    })
  })
})