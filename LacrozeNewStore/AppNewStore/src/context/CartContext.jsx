import { createContext, useState } from 'react';

const CartContext = createContext();


export function CartContextProvider({ children }) {
    const [itemsCart, setItemsCart] = useState([]);
    const [itemsCount, setItemsCount]=useState(0);

    function addItem(item, qty) {
        if (isItemInCart(item.id)) {
            let index=itemsCart.findIndex(i=>i.id===item.id);
            let copyCart=[...itemsCart];
            copyCart[index].qty+=qty;
            setItemsCart(copyCart);
            setItemsCount(itemsCount+qty)
        }
        else {
            const itemToAdd = { ...item, qty }
            setItemsCart([...itemsCart, itemToAdd]);
            setItemsCount(itemsCount+qty)
        }
    }
    function isItemInCart(id) {
        return itemsCart.some(cadaitem => cadaitem.id === id)
    }
    function getItemInCart(id) {
        return itemsCart.find(cadaitem => cadaitem.id === id)
    }
    function deleteCartById(id){
        let index=itemsCart.findIndex(i=>i.id===id);
        let qty=itemsCart.find(i=>i.id===id).qty;
        let copyCart=[...itemsCart];
        copyCart.splice(index,1);
        setItemsCart([...copyCart])
        setItemsCount(itemsCount-qty)

    
    }
    const totalProductsPrice = () => {
        return itemsCart.reduce((add, i) => (add += i.price * i.qty), 0)
    }

    function clearCart() {
        setItemsCart([]);
        setItemsCount(0)
    }
   
    

    return (
        <CartContext.Provider value={{ itemsCart, addItem,getItemInCart, clearCart,deleteCartById,itemsCount,totalProductsPrice }}>
            {children}
        </CartContext.Provider>
    )
}

export default CartContext;

