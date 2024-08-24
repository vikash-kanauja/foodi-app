import Cart from "../modules/cartSchema.js";

// Add item to cart
export const addToCart = async (req, res) => {

  // console.log(req.body,"req.bodyreq.bodyreq.bodyreq.bodyreq.bodyreq.body");
  // console.log(req.user,"req.bodyreq.bodyreq.bodyreq.bodyreq.bodyreq.body");

  
  const { menuItemId, name, image, price, quantity } = req.body;
  const userId = req.user.id; // Assuming `req.user` contains the authenticated user

  try {
    let cart = await Cart.findOne({ userId });

    if (cart) {
      // Check if the item already exists in the cart
      const itemIndex = cart.items.findIndex(
        (item) => item.menuItemId.toString() === menuItemId
      );

      if (itemIndex > -1) {
        // If item exists, update quantity
        cart.items[itemIndex].quantity += quantity;
      } else {
        // If item does not exist, add to cart
        cart.items.push({ menuItemId, name, image, price, quantity });
      }
    } else {
      // If no cart exists for the user, create a new cart
      cart = new Cart({
        userId,
        items: [{ menuItemId, name, image, price, quantity }],
      });
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: "Error adding item to cart", error });
  }
};

// Get cart for a user
export const getCart = async (req, res) => {
  const userId = req.user.id;
// .populate("items.menuItemId")
  try {
    const cart = await Cart.findOne({ userId });
    console.log(cart,"cartTTTTTTTTTTTTTTTTTTTT");
    

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving cart", error });
  }
};

// Remove item from cart
// export const removeFromCart = async (req, res) => {
//   const userId = req.user.id;
//   const { menuItemId } = req.params;

//   console.log(userId,"userIduserIduserIduserId");
//   console.log(menuItemId,"menuItemIdmenuItemId----------------");

//   try {
//     const cart = await Cart.findOne({ userId });

//     if (!cart) {
//       return res.status(404).json({ message: "Cart not found" });
//     }

//     cart.items = cart.items.filter(
//       (item) => item.menuItemId.toString() !== menuItemId
//     );

//     await cart.save();
//     res.status(200).json(cart);
//   } catch (error) {
//     res.status(500).json({ message: "Error removing item from cart", error });
//   }
// };

import mongoose from 'mongoose';

export const removeFromCart = async (req, res) => {
  const userId = req.user.id;
  const { menuItemId } = req.params;

  console.log(userId, "userIduserIduserIduserId");
  console.log(menuItemId, "menuItemIdmenuItemId----------------");

  try {
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Ensure menuItemId is a string
    const menuItemIdStr = menuItemId.toString();

    cart.items = cart.items.filter(
      (item) => item.menuItemId.toString() !== menuItemIdStr
    );

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    console.error("Error removing item from cart", error); // Log the error
    res.status(500).json({ message: "Error removing item from cart", error });
  }
};
