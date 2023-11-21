class ProductManager {
  constructor() {
    this.products = [];
    this.productId = 1;
  }

  addProduct(title, description, price, thumbnail, code, stock) {
    if (!title || !description || !price || !thumbnail || !code || !stock) {
      console.log("Todos los campos son obligatorios.");
      return;
    }

    const existingProduct = this.products.find(
      (product) => product.code === code
    );
    if (existingProduct) {
      console.log("Ya existe un producto con este código.");
      return;
    }

    const newProduct = {
      id: this.productId,
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    };

    this.products.push(newProduct);
    this.productId++;
  }

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    const product = this.products.find((product) => product.id === id);
    if (!product) {
      console.error("Producto no encontrado.");
    }
    return product;
  }
}

const manager = new ProductManager();
manager.addProduct(
  "Producto 1",
  "Descripción del producto 1",
  25,
  "imagen1.jpg",
  "ABC123",
  50
);
manager.addProduct(
  "Producto 2",
  "Descripción del producto 2",
  30,
  "imagen2.jpg",
  "DEF456",
  30
);

console.log(manager.getProducts());
console.log(manager.getProductById(1));
console.log(manager.getProductById(3));
