import {useState} from 'react'


function ItemCount({stock,addToCart}) {
    const [count, setCount] = useState(1);

    function suma(){
        if(count<stock){
            setCount(count+1)
        }
        
    }
    function resta(){
        if(count>1){
        setCount(count-1)
        }
    }


    return (
        <div>
            <button onClick={resta} type="button">-</button>
            <button onClick={suma} type="button">+</button>
            <span>{count}</span>
            <button className="button-green" onClick={()=>{addToCart(count)}} type="button">Agregar al carrito</button>
            <p>Stock disponible {stock}</p>
        </div>
    )
  }
  
  export default ItemCount;
  
  