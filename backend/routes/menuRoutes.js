import express from 'express';
import {
    createMenuItem,
    getAllMenuItems,
    getMenuItemById,
    updateMenuItem,
    deleteMenuItem
} from '../controllers/MenuController.js';
import { authenticateToken } from '../middleware/verify.js';

const MenuRoutes = express.Router();

// Route to create a new menu item
MenuRoutes.post('/', authenticateToken, createMenuItem);

// Route to get all menu 
MenuRoutes.get('/', getAllMenuItems);

// Route to get a single menu item by ID
MenuRoutes.get('/:id', getMenuItemById);

// Route to update a menu item by ID
MenuRoutes.put('/:id', authenticateToken, updateMenuItem);

// Route to delete a menu item by ID
MenuRoutes.delete('/:id', authenticateToken, deleteMenuItem);

export default MenuRoutes;
