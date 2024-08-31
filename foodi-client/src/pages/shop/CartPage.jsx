// import axios from "axios";
// import { MdDelete } from "react-icons/md";
// import React, { useContext, useEffect, useState } from "react";
// import { AuthContext } from "../../contexts/AuthProvider";

// const CartPage = () => {
//   const [items, setItems] = useState([]);
//   const { user, loading, getCart, cart } = useContext(AuthContext);
//   // const getCart = async () => {
//   //   const response = await axios.get("http://localhost:4000/api/cart", {
//   //     withCredentials: true, // to include cookies
//   //     headers: {
//   //       // Authorization: `Bearer ${user.token}`, // Assuming you're using JWT
//   //       "Content-Type": "application/json",
//   //     },
//   //   });
//   //   const result = response.data.items;
//   //   setItems(result);
//   //   console.log(result);
//   // };
//   // useEffect(() => {
//     // getCart();
//   // }, []);

//   return (
//     <div className="section-container">
//       {/* Banner */}
//       <div className="bg-gradient-to-r from-0% from-[#FAFAFA] to-[#FCFCFC] to-100%">
//         <div className="py-36 flex flex-col  items-center justify-center gap-8">
//           {/* texts */}
//           <div className=" px-4 space-y-7">
//             <h2 className="md:text-5xl text-4xl font-bold md:leading-snug leading-snug">
//               Item Added to The <span className="text-green">Food</span>
//             </h2>
//           </div>
//         </div>
//       </div>

//       {/*table for the cart */}
//       <div>
//         <div className="overflow-x-auto">
//           <table className="table">
//             {/* head */}
//             <thead className="bg-green text-white rounded-sm">
//               <tr>
//                 <th className="text-center">#</th>
//                 <th className="text-center">Food</th>
//                 <th className="text-center">Item Name</th>
//                 <th className="text-center">Quantity</th>
//                 <th className="text-center">Price</th>
//                 <th className="text-center">Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {/* row 1 */}
//               {loading ? <div>Loading.......</div> : cart?.map((item, index) => {
//                 return (
//                   <tr key={index}>
//                     <td className="text-center">{index + 1}</td>
//                     <td className="text-center">
//                       <div className="flex items-center gap-3">
//                         <div className="avatar">
//                           <div className="mask mask-squircle h-12 w-12">
//                             <img src={item.image} alt="product image" />
//                           </div>
//                         </div>
//                       </div>
//                     </td>
//                     <td className="text-center">
//                       {item.name}
//                       <br />
//                       <span className="badge badge-ghost badge-sm">
//                         Desktop Support Technician
//                       </span>
//                     </td>
//                     <td className="text-center">
//                       <button className="btn btn-ghost btn-xs text-green text-center text-xl">
//                         -
//                       </button>
//                       {item.quantity}

//                       <button className="btn btn-ghost btn-xs text-green text-center text-xl">
//                         +
//                       </button>
//                     </td>
//                     <td className="text-center">{item.price}</td>
//                     <td className="text-center">
//                       <button className="btn btn-ghost btn-xs text-red text-lg">
//                         <MdDelete />
//                       </button>
//                     </td>
//                   </tr>
//                 );
//               })}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CartPage;

// import React, { useContext, useEffect } from "react";
// import { AuthContext } from "../../contexts/AuthProvider";
// import { MdDelete } from "react-icons/md";

// const CartPage = () => {
//   const { user, loading, cart, getCart } = useContext(AuthContext);

//   // Ensure the cart is fetched whenever the CartPage mounts
//   useEffect(() => {
//     if (user && !cart) {
//       getCart();
//     }
//   }, [user, cart, getCart]);

//   return (
//     <div className="section-container">
//       {/* Banner */}
//       <div className="bg-gradient-to-r from-0% from-[#FAFAFA] to-[#FCFCFC] to-100%">
//         <div className="py-36 flex flex-col items-center justify-center gap-8">
//           {/* texts */}
//           <div className="px-4 space-y-7">
//             <h2 className="md:text-5xl text-4xl font-bold md:leading-snug leading-snug">
//               Item Added to The <span className="text-green">Food</span>
//             </h2>
//           </div>
//         </div>
//       </div>

//       {/* Table for the cart */}
//       <div>
//         <div className="overflow-x-auto">
//           <table className="table">
//             {/* Head */}
//             <thead className="bg-green text-white rounded-sm">
//               <tr>
//                 <th className="text-center">#</th>
//                 <th className="text-center">Food</th>
//                 <th className="text-center">Item Name</th>
//                 <th className="text-center">Quantity</th>
//                 <th className="text-center">Price</th>
//                 <th className="text-center">Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {loading ? (
//                 <tr>
//                   <td colSpan="6" className="text-center">
//                     Loading.......
//                   </td>
//                 </tr>
//               ) : cart && cart.items.length > 0 ? (
//                 cart.items.map((item, index) => (
//                   <tr key={index}>
//                     <td className="text-center">{index + 1}</td>
//                     <td className="text-center">
//                       <div className="flex items-center gap-3">
//                         <div className="avatar">
//                           <div className="mask mask-squircle h-12 w-12">
//                             <img src={item.image} alt="product" />
//                           </div>
//                         </div>
//                       </div>
//                     </td>
//                     <td className="text-center">{item.name}</td>
//                     <td className="text-center">
//                       <button className="btn btn-ghost btn-xs text-green text-center text-xl">
//                         -
//                       </button>
//                       {item.quantity}
//                       <button className="btn btn-ghost btn-xs text-green text-center text-xl">
//                         +
//                       </button>
//                     </td>
//                     <td className="text-center">${item.price}</td>
//                     <td className="text-center">
//                       <button className="btn btn-ghost btn-xs text-red text-lg">
//                         <MdDelete />
//                       </button>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="6" className="text-center">
//                     Your cart is empty
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CartPage;

import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthProvider";
import { MdDelete } from "react-icons/md";
import Swal from 'sweetalert2'

const CartPage = () => {
  const { user, loading, cart, getCart, updateQuantity } =
    useContext(AuthContext);
  const [cartItems, setCartItems] = useState(cart?.items || []);

  // Ensure the cart is fetched whenever the CartPage mounts
  useEffect(() => {
    if (user && !cart) {
      getCart();
    }
  }, [user, cart, getCart]);

  useEffect(() => {
    if (cart) {
      setCartItems(cart.items);
    }
  }, [cart]);

  const total = cartItems.reduce((accu, curr, i) => {
    return (accu += curr.quantity * curr.price);
  }, 0);

  const removeFromCart =  (menuItemId) => {

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(`http://localhost:4000/api/cart/remove/${menuItemId}`, {
              method: 'DELETE',
              credentials: 'include',
              headers: {
                  Authorization: `Bearer ${user.token}`,
              },
          });
  
          if (response.ok) {
              const updatedCart = await response.json();
              setCartItems(updatedCart.items);
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
              });
              console.log(updatedCart.items);
              
          }
      } catch (error) {
          console.error('Error removing from cart:', error);
      }
      }
    });

};
  // General handler for changing quantity
  const handleQuantityChange = async (menuItemId, newQuantity) => {
    try {
      if (newQuantity > 0) {
        // Ensure quantity doesn't drop below 1
        const updatedCart = await updateQuantity(menuItemId, newQuantity);
        setCartItems(updatedCart.items); // Update cart items in state
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  return (
    <div className="section-container">
      {/* Banner */}
      <div className="bg-gradient-to-r from-0% from-[#FAFAFA] to-[#FCFCFC] to-100%">
        <div className="py-36 flex flex-col items-center justify-center gap-8">
          {/* texts */}
          <div className="px-4 space-y-7">
            <h2 className="md:text-5xl text-4xl font-bold md:leading-snug leading-snug">
              Item Added to The <span className="text-green">Food</span>
            </h2>
          </div>
        </div>
      </div>

      {/* Table for the cart */}
      <div>
        <div className="overflow-x-auto">
          <table className="table">
            {/* Head */}
            <thead className="bg-green text-white rounded-sm">
              <tr>
                <th className="text-center">#</th>
                <th className="text-center">Food</th>
                <th className="text-center">Item Name</th>
                <th className="text-center">Quantity</th>
                <th className="text-center">Price</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6" className="text-center">
                    Loading.......
                  </td>
                </tr>
              ) : cartItems && cartItems.length > 0 ? (
                cartItems.map((item, index) => (
                  <tr key={index}>
                    <td className="text-center">{index + 1}</td>
                    <td className="text-center">
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle h-12 w-12">
                            <img src={item.image} alt="product" />
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="text-center">{item.name}</td>
                    <td className="text-center">
                      <button
                        className="btn btn-ghost btn-xs text-green text-center text-xl"
                        onClick={() =>
                          handleQuantityChange(
                            item.menuItemId,
                            item.quantity - 1
                          )
                        }
                      >
                        -
                      </button>
                      {item.quantity}
                      <button
                        className="btn btn-ghost btn-xs text-green text-center text-xl"
                        onClick={() =>
                          handleQuantityChange(
                            item.menuItemId,
                            item.quantity + 1
                          )
                        }
                      >
                        +
                      </button>
                    </td>
                    <td className="text-center">
                      {parseFloat(item.quantity * item.price).toFixed(2)}
                    </td>
                    <td className="text-center">
                      <button className="btn btn-ghost btn-xs text-red text-lg" onClick={()=>removeFromCart(item.menuItemId)}>
                        <MdDelete />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center">
                    Your cart is empty
                  </td>
                </tr>
              )}
            </tbody>
            <tfoot className="">
              <tr className="bg-red text-center">
                <td colSpan={6} className="">
                  TOTAL :
                  {` ${total.toFixed(2)} `
                    
                  }
                  $
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
