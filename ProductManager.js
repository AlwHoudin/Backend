const fs = require('fs');

class ProductManager {
  constructor(filePath) {
    this.filePath = filePath;
    this.products = this.readProductsFromFile() || [];
    this.productId = this.generateNextId();
  }

  readProductsFromFile() {
    try {
      const data = fs.readFileSync(this.filePath, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Error reading file:', error);
      return null;
    }
  }

  saveProductsToFile() {
    try {
      const data = JSON.stringify(this.products, null, 2);
      fs.writeFileSync(this.filePath, data);
    } catch (error) {
      console.error('Error writing file:', error);
    }
  }

  generateNextId() {
    return this.products.length > 0 ? Math.max(...this.products.map(product => product.id)) + 1 : 1;
  }

  addProduct(newProduct) {
    newProduct.id = this.productId++;
    this.products.push(newProduct);
    this.saveProductsToFile();
  }

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    const product = this.products.find(product => product.id === id);
    if (!product) {
      console.error('Product not found.');
    }
    return product;
  }

  updateProduct(id, updatedFields) {
    const productIndex = this.products.findIndex(product => product.id === id);
    if (productIndex !== -1) {
      this.products[productIndex] = { ...this.products[productIndex], ...updatedFields };
      this.saveProductsToFile();
    } else {
      console.error('Product not found.');
    }
  }

  deleteProduct(id) {
    const updatedProducts = this.products.filter(product => product.id !== id);
    if (updatedProducts.length !== this.products.length) {
      this.products = updatedProducts;
      this.saveProductsToFile();
    } else {
      console.error('Product not found.');
    }
  }
}

module.exports = ProductManager;
