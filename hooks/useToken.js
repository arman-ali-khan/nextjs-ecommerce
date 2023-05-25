import axios from "axios"

const { useState, useEffect } = require("react")

const useToken = email =>{
    const [token,setToken] = useState('')
    useEffect(()=>{
       if(email){
       axios.get(`${process.env.NEXT_PUBLIC_API_PRO}/api/jwt?email=${email}`)
        .then(res=>{
            if(res.data.accessToken){
                localStorage.setItem('accessToken',res.data.accessToken);
                setToken(res.data.accessToken)
            }
        })
       }
    },[email])
    return [token]
}

export default useToken;