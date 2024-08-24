import express from 'express';
import { addToCart, getCart, removeFromCart } from '../controllers/CartController.js';
import { authenticateToken } from '../middleware/verify.js';

const CartRoutes = express.Router();

// Add item to cart
CartRoutes.post('/add', authenticateToken, addToCart);

// Get cart for user
CartRoutes.get('/', authenticateToken, getCart);

// Remove item from cart
CartRoutes.delete('/remove/:menuItemId', authenticateToken, removeFromCart);

export default CartRoutes;
