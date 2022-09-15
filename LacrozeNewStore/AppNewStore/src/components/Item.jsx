import { useEffect, useState} from "react"
import '../Item.css';
function Item() {
    const producto = { id: '0', title: 'Nike air force one', price: 70000, img: 'https://nikeclprod.vteximg.com.br/arquivos/ids/158944-1000-1000/CT2302_100_A_PREM.jpg?v=637654374150800000' }

    const[productoState,setProductoState]=useState([])

    useEffect(() => {
        getProductos()
        console.log('Efecto realizado con éxito')
    }, [])

    const getProductos = () => {
        const getProductosPromesa = new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(setProductoState(producto))  
            }, 2000);
        })
        getProductosPromesa.then(response => {
            console.log(response)
        })
    }
    return (
        <div>
            <div className="container">
                <div className="card">
                    <img src={productoState.img}></img>
                    <h4>{productoState.title}</h4>
                    <p>{productoState.price}</p>
                </div>
            </div>
        </div>
    )
}
export default Item