import { useState, createContext, useEffect, useContext } from "react";
import { toast } from "react-toastify";
import AuthContext from "./AuthContext";

const CartContext = createContext();

//Compile the cart state
export const CartContextProvider = ({ children }) => {
  //Extract the current user
   const { user } = useContext(AuthContext);

  //Check Localstoregeg for cart info/data and initilaize the cart.
  const initCart = localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [];

    //Create the cart state.
  const [cart, setCart] = useState([
    ...initCart.filter((item) => {
      if (user) {
        return !user.courses.includes(item);
      } else {
        return true;
      }
    }),
  ]);

  localStorage.setItem("cart", JSON.stringify(cart));

  //Add to cart: Use the uuid
  const addCart = (uuid) => {
    //Check if item already exists
    if (!cart.includes(uuid)) {
      setCart([...cart, uuid]);
      localStorage.setItem("cart", JSON.stringify([...cart, uuid]));
      //respond back to the user.
      toast.info("1 course added to cart");
    }
  };

  //Remove from cart ie delete
  const removeCart = (uuid) => {
    //Get the item to delete from the cart
    const index = cart.findIndex((item) => item === uuid);

    //On when the index is greater than 1, delete the record.Consider empty cases
    if (index > -1) {
      //Create new cart
      const currentCart = [...cart];
      //Remove the item with id
      currentCart.splice(index, 1);
      //Update state with the new cart.
      setCart(currentCart);
      //Save to local storage
      localStorage.setItem("cart", JSON.stringify(currentCart));
      //Responde back to user
      toast.info("1 course removed from cart");
    }
  };

  //Clear the cart.
  const clearCart = () => {
    setCart([]);
    localStorage.setItem("cart", JSON.stringify([]));
  };

  //Return a context provider object with all values.
  return (
    <CartContext.Provider value={{ cart, addCart, removeCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
