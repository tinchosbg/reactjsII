import logo from '../images/tienda-online.png'
import CartContext from '../context/CartContext';
import { useContext} from 'react';
import {Link} from 'react-router-dom';

function CartWidget() {
    const estilos={
        height:'45px'
    } 
    const { itemsCount } = useContext(CartContext);
    if(itemsCount==0){
        return (
            <div>
            </div>
        )
    }else{
    return (
        <div>
        <Link to='/cart'><img style={estilos} src={logo}></img></Link>
           <span>{itemsCount}</span>
        </div>
    )
    }
}
export default CartWidget