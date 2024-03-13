import Product from "../entity/product";
import ProductInterface from "../entity/product.interface";
import { v4 as uuid } from "uuid";
import ProductB from "../entity/product-b";

export default class ProductFactory {
  public static create(
    name: string,
    price: number,
    type: string
  ): ProductInterface {
    switch (type) {
      case "a":
        return new Product(uuid(), name, price, type);
      case "b":
        return new ProductB(uuid(), name, price, type);
      default:
        throw new Error("Product type not supported");
    }
  }
}
