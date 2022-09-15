// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import "firebase/firestore"
import { collection, addDoc, getDocs, getFirestore, where, query, updateDoc, doc } from "firebase/firestore"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_FIREBASE_APPID,
  measurementId:process.env.REACT_APP_FIREBASE_MEASUREMENTID 
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = getFirestore()
const productsCollection = collection(db, "productos")
const ordersCollection = collection(db, "orden")

export const getProducts = async () => {
  const querySnapshot = await getDocs(productsCollection);
  let products = []
  querySnapshot.forEach(doc => {
    console.log(doc.data());
    products.push(doc.data())

  })
  return products
}

export const getProductsByProp = async (prop, value) => {
  const q = query(productsCollection, where(prop, "==", value));
  const querySnapshot = await getDocs(q);
  let products = []
  querySnapshot.forEach((doc) => {
    products.push(doc.data())
  })
  return products
}

export const addOrder = (buyer, itemsCart, totalProductsPrice, clearCart, products) => {
  const newOrder = {
    buyer,
    itemsCart,
    total: totalProductsPrice()
  }

  const res = addDoc(ordersCollection, newOrder)

  const updateOrden = async(id,stock,cantidad)=>{
    await updateDoc(doc(db,'productos',id),{stock:stock-cantidad})
    return res
  }
  
  const getProductsByPropUpdate = async (prop, value) => {
    const q = query(productsCollection, where(prop, "==", value));
    const querySnapshot = await getDocs(q);
    let productos = []
    querySnapshot.forEach((doc) => {
      productos.push(doc.id)
      clearCart()
    })
    return productos
  }
  
  products.forEach(p=>{
    const buscar=getProductsByPropUpdate('id', p.id)
    buscar.then((response)=>{
      const stock=p.stock
      const cantidad=p.qty
      updateOrden(response[0],stock,cantidad);
    })
    .catch((error)=>{
      console.log(error)
    })

  })
}






//export const getFirebase=()=>{return app}

