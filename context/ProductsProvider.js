import { authentication } from "@/firebase/firebase.config";
import  actionTypes  from "@/state/ProductState/actionTypes";
import { initialState, productsReducer } from "@/state/ProductState/productsReducer";
import { userReducer, userInitialState } from "@/state/ProductState/userReducer";
import axios from "axios";
import { onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useReducer, useState } from "react";

export const PRODUCT_CONTEXT  = createContext()


const ProductsProvider = ({children}) => {

    const [user,setUser] = useState({})
    console.log(user)

    const [state,dispatch] = useReducer(productsReducer,initialState)
    // User 
    const [userState,userDispatch] = useReducer(userReducer,userInitialState)
    
console.log(userState)

    useEffect(()=>{
      const unsubscribe =   onAuthStateChanged(authentication, (currentUser) => {
            if (currentUser) {
              // User is signed in, see docs for a list of available properties
              // https://firebase.google.com/docs/reference/js/firebase.User
              setUser(currentUser)
            } else {
              // User is signed out
              // ...
            }
          });
          return ()=>unsubscribe()
    },[])
 

    useEffect(()=>{
        dispatch({type:actionTypes.FETCHING_START})
        fetch('/api/products')
        .then(res=>res.json())
        .then(data=>dispatch({type:actionTypes.FETCHING_SUCCESS,payload:data}))
        .catch(()=>{
            dispatch({type:actionTypes.FETCHING_ERROR})
        })
    },[])
    
    const value = {state,dispatch,userState,userDispatch,user}

    return (
        <PRODUCT_CONTEXT.Provider value={value}>
            {children}
        </PRODUCT_CONTEXT.Provider>
    );
};

export const useProducts = () =>{
    const context = useContext(PRODUCT_CONTEXT)
    return context
}

export default ProductsProvider;