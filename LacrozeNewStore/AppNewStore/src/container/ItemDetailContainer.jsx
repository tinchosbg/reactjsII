import {getProductsByProp} from "../firebase/firebaseClient"
import ItemDetail from "../components/ItemDetail"
import {useState,useEffect} from 'react'
import { useParams } from "react-router-dom"


function ItemDetailContainer() {

    const {itemId}=useParams()
    const [itemState, setItemState] = useState([])

    useEffect(() => {
        getProductsByProp('id',itemId).then(data=>{
            setItemState(data[0])
        })
    },[itemId])


    return (
        <div>
            <ItemDetail item={itemState}></ItemDetail>
        </div>
    )
  }
  
  export default ItemDetailContainer;
  
  