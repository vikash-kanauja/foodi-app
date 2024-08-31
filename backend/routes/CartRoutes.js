import express from 'express';
import { addToCart, getCart, removeFromCart, updateQuantity } from '../controllers/CartController.js';
import { authenticateToken } from '../middleware/verify.js';

const CartRoutes = express.Router();

// Add item to cart
CartRoutes.post('/add', authenticateToken, addToCart);

// Get cart for user
CartRoutes.get('/', authenticateToken, getCart);

// Remove item from cart
CartRoutes.delete('/remove/:menuItemId', authenticateToken, removeFromCart);
// CartRoutes.patch('/decrease/${menuItemId}',authenticateToken,decreaseQuantity)
CartRoutes.put('/update/:menuItemId',authenticateToken,updateQuantity)


export default CartRoutes;
