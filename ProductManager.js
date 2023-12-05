const fs = require('fs').promises;

class ProductManager {
  constructor(filePath) {
    this.filePath = filePath;
  }

  async readProductsFromFile() {
    try {
      const data = await fs.readFile(this.filePath, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      throw new Error('Error reading file');
    }
  }

  async saveProductsToFile(products) {
    try {
      const data = JSON.stringify(products, null, 2);
      await fs.writeFile(this.filePath, data);
    } catch (error) {
      throw new Error('Error writing file');
    }
  }

  async getProducts(limit) {
    try {
      const products = await this.readProductsFromFile();
      if (limit) {
        return products.slice(0, limit);
      }
      return products;
    } catch (error) {
      throw new Error('Error fetching products');
    }
  }

  async getProductById(id) {
    try {
      const products = await this.readProductsFromFile();
      return products.find(product => product.id === id);
    } catch (error) {
      throw new Error('Error fetching product by ID');
    }
  }
}

module.exports = ProductManager;
