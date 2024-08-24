import React, { useContext, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthProvider";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Cards = ({ item }) => {
  // console.log(item,"Itemmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm")
  // const { name, image, price, recipe, _id } = item;
  const [isHeartFilled, setIsHeartFilled] = useState(false);
  const { user, loading } = useContext(AuthContext);
  //Add to cart
  // console.log(user, "useruseruseruser");

  // const handleAddtoCart = (item) => {
  //   console.log("button click", item);
  //   if (user && user?.email) {
  //     const cartItem = { menuItemId: _id ,name,quantity:1,image,price,email:user.email};
  //     console.log(cartItem);
      
  //   }
  // };


const handleAddtoCart = async (item) => {
    console.log("button click", item);
    
    if (user && user?.email) {
        const cartItem = {
            menuItemId: item._id, 
            name: item.name, 
            quantity: 1, 
            image: item.image, 
            price: item.price, 
            email: user.email
        };
        
        try {
            const response = await axios.post('http://localhost:4000/api/cart/add', cartItem, {
                withCredentials: true, // to include cookies
                headers: {
                    Authorization: `Bearer ${user.token}`, // Assuming you're using JWT
                    'Content-Type': 'application/json'
                }
            });

            console.log('Item added to cart:', response.data);
            // Optionally, you can navigate to the cart page or display a success message
            // navigate('/cart');
        } catch (error) {
            console.error('Error adding item to cart:', error.response?.data || error.message);
            // Handle the error, e.g., show an error message to the user
        }
    }
};




  const handleHeartClick = () => {
    setIsHeartFilled(!isHeartFilled);
  };
  return (
    <div
      to={`/menu/${item._id}`}
      className="card shadow-xl relative mr-5 md:my-5"
    >
      <div
        className={`rating gap-1 absolute right-2 top-2 p-4 heartStar bg-green ${
          isHeartFilled ? "text-rose-500" : "text-white"
        }`}
        onClick={handleHeartClick}
      >
        <FaHeart className="w-5 h-5 cursor-pointer" />
      </div>
      <Link to={`/menu/${item._id}`}>
        <figure>
          <img
            src={item.image}
            alt="Shoes"
            className="hover:scale-105 transition-all duration-300 md:h-72"
          />
        </figure>
      </Link>
      <div className="card-body">
        <Link to={`/menu/${item._id}`}>
          <h2 className="card-title">{item.name}!</h2>
        </Link>
        <p>Description of the item</p>
        <div className="card-actions justify-between items-center mt-2">
          <h5 className="font-semibold">
            <span className="text-sm text-red">$ </span> {item.price}
          </h5>
          <button
            className="btn bg-green text-white"
            onClick={() => handleAddtoCart(item)}
          >
            Add to Cart{" "}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cards;
