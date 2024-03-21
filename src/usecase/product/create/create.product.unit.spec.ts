import CreateProductUseCase from "./create.product.usecase"

const input = {
  name: "John",
  type: "a",
  price: 9.99
}

const MockRepository = () => {
  return {
    create: jest.fn(),
    find: jest.fn(),
    findAll: jest.fn(),
    update: jest.fn()
  }
}

describe("Unit test create product usecase", () => {
  it("should create a product", async () => {
    const productRepository = MockRepository();
    const productCreateUsecase = new CreateProductUseCase(productRepository)

    const output = await productCreateUsecase.execute(input)

    expect(output).toEqual({
      id: expect.any(String),
      name: input.name,
      type: input.type,
      price: input.price
    })
  })

  it("should throw an error when name is missing", async () => {
    const productRepository = MockRepository();
    const productCreateUsecase = new CreateProductUseCase(productRepository)

    input.name = ""
    await expect(productCreateUsecase.execute(input)).rejects.toThrow("Name is required")
  })

  it("should throw an error when type is missing", async () => {
    const productRepository = MockRepository();
    const productCreateUsecase = new CreateProductUseCase(productRepository)

    input.type = ""
    await expect(productCreateUsecase.execute(input)).rejects.toThrow("Product type not supported")
  })
})