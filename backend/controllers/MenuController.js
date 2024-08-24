import MenuItem from '../modules/menuItem.js';

// Create a new menu item
export const createMenuItem = async (req, res) => {
    try {
        const newMenuItem = new MenuItem(req.body);
        const savedMenuItem = await newMenuItem.save();
        res.status(201).json(savedMenuItem);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all menu items
export const getAllMenuItems = async (req, res) => {
    try {
        const menuItems = await MenuItem.find();
        res.status(200).json(menuItems);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a menu item by ID
export const getMenuItemById = async (req, res) => {
    try {
        const menuItem = await MenuItem.findById(req.params.id);
        if (!menuItem) {
            return res.status(404).json({ message: 'Menu item not found' });
        }
        res.status(200).json(menuItem);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a menu item by ID
export const updateMenuItem = async (req, res) => {
    try {
        const updatedMenuItem = await MenuItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedMenuItem) {
            return res.status(404).json({ message: 'Menu item not found' });
        }
        res.status(200).json(updatedMenuItem);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a menu item by ID
export const deleteMenuItem = async (req, res) => {
    try {
        const deletedMenuItem = await MenuItem.findByIdAndDelete(req.params.id);
        if (!deletedMenuItem) {
            return res.status(404).json({ message: 'Menu item not found' });
        }
        res.status(200).json({ message: 'Menu item deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
