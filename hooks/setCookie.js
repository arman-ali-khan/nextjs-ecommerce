import React from 'react';
import Cookies from 'universal-cookie';

const setCookie = (data) => {
    const cookies = new Cookies();
cookies.set('accessToken', data, { path: '/' });

};

export default setCookie;

export const accessCookie = (cookie) =>{
    const cookies = new Cookies();
    return cookies.get(cookie)
}   