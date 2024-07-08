class InventoryPage {
    constructor(page) {
      this.page = page;
      this.inventoryUrl = '/inventory.html';
    }
  
    // Check if the inventory page is loaded
    async isLoaded() {
      return await this.page.url().includes(this.inventoryUrl);
    }
  }
  
  module.exports = { InventoryPage };
  