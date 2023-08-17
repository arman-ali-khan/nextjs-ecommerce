

const setToken = (data) => {
    typeof window !== 'undefined' && localStorage.setItem('accessToken', JSON.stringify(data));
console.log(data,'Token')
};

export default setToken;

export const accessToken = (data) =>{
        const token = typeof window !== 'undefined' && localStorage.getItem(data)
        return token
}   