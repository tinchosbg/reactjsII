import { useEffect } from 'react'
import '../Item.css';
import { Link } from 'react-router-dom';
function ItemList(props) {
    try {
        if (props.productos.length > 1) {
            return (
                <div>
                    <div className="container">
                        {
                            props.productos.map(producto => <div className="card" key={producto.id}> <Link to={`/item/${producto.id}`}><img src={producto.img}></img></Link><h4>{producto.title}</h4><p >{producto.price}</p></div>

                            )
                        }
                    </div>
                </div>
            )
        }
        if (props.productos.length = 1) {
            return (
                <div>
                    <div className="container">
                        <div className="card">
                            <img src={props.productos.img}></img>
                            <h4>{props.productos.title}</h4>
                            <p>{props.productos.price}</p>
                        </div>
                    </div>
                </div>
            )
        }
    } catch (e) {
        return (
            <div>
                <h4>Error no se encuentra el producto .</h4>
            </div>
        )
    }
}
export default ItemList