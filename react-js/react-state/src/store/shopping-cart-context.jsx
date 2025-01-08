import { useReducer, useState } from "react";
import { createContext } from "react"
import { DUMMY_PRODUCTS } from '../dummy-products.js';
export const CartContext = createContext({
    items:[],
    handleUpdateCartItemQuantity:()=>{},
    handleAddItemToCart:()=>{}
});
function shppingCartReducer(state, action)
{
    if(action.type === "ADD_ITEM")
    {
        const updatedItems = [...state.items];
    
          const existingCartItemIndex = updatedItems.findIndex(
            (cartItem) => cartItem.id === action.payload.id
          );
          const existingCartItem = updatedItems[existingCartItemIndex];
    
          if (existingCartItem) {
            const updatedItem = {
              ...existingCartItem,
              quantity: existingCartItem.quantity + 1,
            };
            updatedItems[existingCartItemIndex] = updatedItem;
          } else {
            const product = DUMMY_PRODUCTS.find((product) => product.id === action.payload.id);
            updatedItems.push({
              id: action.payload.id,
              name: product.title,
              price: product.price,
              quantity: 1,
            });
          }
    
          return {
            items: updatedItems,
          };
    }
    if(action.type === "UPDATE_ITEM")
    {
        const updatedItems = [...state.items];
        const updatedItemIndex = updatedItems.findIndex(
          (item) => item.id === action.payload.productId
        );
  
        const updatedItem = {
          ...updatedItems[updatedItemIndex],
        };
  
        updatedItem.quantity += action.payload.amount;
  
        if (updatedItem.quantity <= 0) {
          updatedItems.splice(updatedItemIndex, 1);
        } else {
          updatedItems[updatedItemIndex] = updatedItem;
        }
  
        return {
          items: updatedItems,
        };
    }
    return state;
}
export default function CartContextProvider({children}) {
    const [state, dispatch] = useReducer(shppingCartReducer,{
        items: []
      });
    
      function handleAddItemToCart(id) {
        dispatch({
            type:'ADD_ITEM',
            payload:{
                id
            }
        });
      }
    
      function handleUpdateCartItemQuantity(productId, amount) {
        dispatch({
            type:'UPDATE_ITEM',
            payload:{
                productId,
                amount
            }
        });
      }
   const context = {
    items:state.items,
    handleUpdateCartItemQuantity:handleUpdateCartItemQuantity,
    handleAddItemToCart:handleAddItemToCart
   };
return <CartContext.Provider value={context}>
    {children}
    </CartContext.Provider>;
}