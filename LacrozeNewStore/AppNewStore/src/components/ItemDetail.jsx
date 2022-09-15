import '../Item.css';
import ItemCount from '../itemCount/ItemCount';
import { useContext, useState } from 'react';
import CartContext from '../context/CartContext';
import {Link} from 'react-router-dom';



function ItemList({ item }) {
    const { addItem, getItemInCart } = useContext(CartContext);
    let stockNuevo = item.stock;
    const [isInCart, setIsInCart] = useState(false);
    let IsStock = true;


    function addToCart(qty) {
        addItem(item, qty);
        setIsInCart(true);
    }

    let itemInCart = getItemInCart(item.id);
    if(item.stock==0){
        IsStock=false;
    }

    if (itemInCart) {
        stockNuevo = item.stock - itemInCart.qty;
        if (stockNuevo === 0) {
            IsStock = false;
        }
    }
    
    try {
        if (item.length = 1) {
            return (
                <div>
                    <div className="container">
                        <div className="card-detail">
                            <img src={item.img}></img>
                        </div>
                        <div className="card-detail">
                            <h4>{item.title}</h4>
                            <p className="titulo">Precio</p>
                            <p id="descripcion-precio">${item.price}</p>
                            <p className="titulo">Descripcion</p>
                            <p id="descripcion-item">{item.description}</p>

                            {isInCart ?
                                <>
                                    <Link  to='/cart'> <button className="button-green" type="button">Terminar compra</button></Link>
                                
                                </>
                                    :
                                    IsStock ?
                                    <ItemCount addToCart={addToCart} stock={stockNuevo} />
                                    :
                                    <p>No hay más stock de este producto</p>
                            }
                            
                        </div>
                    </div>
                </div>
            )
        }
    }
    catch (e) {
        return (
            <div>
                <h4>Error no se encuentra el detalle del producto.</h4>
            </div>
        )
    }
}
export default ItemList