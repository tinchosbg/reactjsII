import {getProducts,getProductsByProp} from "../firebase/firebaseClient"
import ItemList from "../components/ItemList"
import {useState,useEffect} from 'react'
import { useParams } from "react-router-dom"


function ItemListContainer({Mensaje}) {
    const estilos={
        fontSize:'20px',
        marginRight:'75px'
    }
    
    const [productoState, setProductoState] = useState([])
    const {categoryId}=useParams()
    
    useEffect(() => {
        if(categoryId){
            getProductsByProp('category',categoryId).then(data=>{
                setProductoState(data)
            })

        }else{
            getProducts().then(data=>{
                setProductoState(data)
            })
        }  
        
    },[categoryId])

    


    return (
        <div>
            <span style={estilos}>{Mensaje}</span>
            <ItemList productos={productoState}></ItemList>    
        </div>
    )
}
export default ItemListContainer