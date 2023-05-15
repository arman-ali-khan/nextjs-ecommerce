import { useEffect } from "react";


const setToken = (data) => {
    typeof window !== 'undefined' && localStorage.setItem('accessToken', JSON.stringify(data));

};

export default setToken;

export const accessToken = (data) =>{
        const token = typeof window !== 'undefined' && JSON.parse(localStorage.getItem(data))
        return token
}   