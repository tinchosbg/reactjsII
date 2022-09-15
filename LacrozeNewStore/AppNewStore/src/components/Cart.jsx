import { useContext } from 'react';
import CartContext from '../context/CartContext';
import { Link } from 'react-router-dom';
import { addOrder } from "../firebase/firebaseClient"
import { useState } from "react"
import '../Item.css';

function Cart() {
    const { itemsCart, deleteCartById, clearCart, totalProductsPrice } = useContext(CartContext);
    function removeItem(id) {
        deleteCartById(id);

    }
    function carroIs() {
        clearCart();
    }
    const [form, setForm] = useState({
        name: '',
        email: '',
        phone: '',
        emailConfirmation: ''
    })

    const getContactData = (e) => {
        const { name, value } = e.target
        setForm((state) => {
            return { ...state, [name]: value }
        })
        console.log(form)
    }

    const finalizePurchase = () => {
        const { name, email, phone,emailConfirmation } = form
        if (name.trim().length <= 0) {
            alert("El nombre no puede estar vacío")
            return false;
        }
        if (email.trim().length <= 0) {
            alert("El email no puede estar vacío")
            return false;
        }
        if(email.trim().length>0){
            if(email!=emailConfirmation){
                alert("Error en la confirmación del correo")
                return false
            }
        }
        if (phone.trim().length <= 0) {
            alert("El teléfono no puede estar vacío")
            return false;
        }
        addOrder({ name, email, phone }, itemsCart, totalProductsPrice, clearCart, itemsCart)
        alert("Compra realizada con éxito")
        return true;


    }

    const estilos = {
        width: '100px',
        heigth: '100px'
    }

    if (itemsCart.length === 0) {
        return (
            <div>
                <h3>No hay productos agregados al Carrito.</h3>
                <Link to="/">
                    <button className="button-green" type="button">Continuar Comprando</button>
                </Link>

            </div>
        )
    } else {
        return (
            <div>
                <div className="main-table">
                    <table>
                        <tbody>
                            <tr id="head">
                                <td>ID</td>
                                <td>NOMBRE</td>
                                <td>PRECIO</td>
                                <td>CATEGORIA</td>
                                <td>CANTIDAD</td>
                                <td>IMAGEN</td>
                                <td>ELIMINAR ITEM</td>
                            </tr>
                            {itemsCart.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.title}</td>
                                    <td>{item.price}</td>
                                    <td>{item.category}</td>
                                    <td>{item.qty}</td>
                                    <td><img src={item.img} style={estilos}></img></td>
                                    <td><button className="button-red" onClick={() => { removeItem(item.id) }} type="button">Eliminar item</button></td>
                                </tr>

                            )
                            )
                            }
                        </tbody>
                    </table>
                </div>
                <div>
                    <h2 className="title">Datos de Contacto</h2>
                    <form className="form">
                        <div className="formInput">
                            <input placeholder="Nombre y Apellido" name="name" value={form.name} onChange={getContactData} type="text" />
                        </div>
                        <div className="formInput">
                            <input placeholder="Email" name="email" value={form.email} onChange={getContactData} type="email" />
                        </div>
                        <div className="formInput">
                            <input placeholder="Teléfono" name="phone" value={form.phone} onChange={getContactData} type="text" />
                        </div>
                        <div className="formInput">
                            <input placeholder="Confirma Email" name="emailConfirmation" value={form.emailConfirmation} onChange={getContactData} type="email" />
                        </div>
                        <button className="button-green" type="button" onClick={finalizePurchase} >Total a pagar: {totalProductsPrice()}</button>
                        <button className="button-red" onClick={() => { carroIs() }} type="button">Vaciar carrito</button>
                    </form>
                </div>





            </div>
        )
    }

}
export default Cart