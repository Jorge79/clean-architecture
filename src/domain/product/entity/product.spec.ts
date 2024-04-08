import Product from "./product";

describe("Product unit tests", () => {
  it("should throw error when id is empty", () => {
    expect(() => {
      const product = new Product("", "Product 1", 100, "a");
    }).toThrowError("Id is required");
  });

  it("should throw error when name is empty", () => {
    expect(() => {
      const product = new Product("123", "", 100, "b");
    }).toThrowError("Name is required");
  });

  it("should throw error when name and id are empty", () => {
    try {
      let product = new Product("", "", 0, "");
    } catch (error) {
      expect(error.toString()).toEqual("Error: product: Id is required,product: Name is required,product: price must be a positive number")
    }
  });

  it("should throw error when price is less than zero", () => {
    expect(() => {
      const product = new Product("123", "Name", -1, "a");
    }).toThrowError("price must be a positive number");
  });

  it("should change name", () => {
    const product = new Product("123", "Product 1", 100, "a");
    product.changeName("Product 2");
    expect(product.name).toBe("Product 2");
  });

  it("should change price", () => {
    const product = new Product("123", "Product 1", 100, "b");
    product.changePrice(150);
    expect(product.price).toBe(150);
  });
});
