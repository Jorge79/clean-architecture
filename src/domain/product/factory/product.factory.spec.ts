import ProductFactory from "./product.factory";

describe("Product factory unit test", () => {
  it("should create a product type a", () => {
    const product = ProductFactory.create("Product A", 1, "a");

    expect(product.id).toBeDefined();
    expect(product.name).toBe("Product A");
    expect(product.price).toBe(1);
    expect(product.constructor.name).toBe("Product");
  });

  it("should create a product type b", () => {
    const product = ProductFactory.create("Product B", 2, "b");

    expect(product.id).toBeDefined();
    expect(product.name).toBe("Product B");
    expect(product.price).toBe(4);
    expect(product.constructor.name).toBe("ProductB");
  });

  it("should throw an error when product type is not supported", () => {
    expect(() => ProductFactory.create("Product C", 10.99, "c")).toThrowError(
      "Product type not supported"
    );
  });
});
