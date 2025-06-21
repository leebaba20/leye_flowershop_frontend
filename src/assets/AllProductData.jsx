// src/assets/allProductData.js
import Products from './products';
import latest_collections from './New_collections';

const combined = [...Products, ...latest_collections];

// Remove duplicates by ID
const allProducts = Array.from(new Map(combined.map(item => [item.id, item])).values());

export default allProducts;
