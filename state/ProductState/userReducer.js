import  actionTypes  from "./actionTypes"

export const userInitialState = {
    loading:false,
    user: {},
    error:false
}
export const userReducer=(state,action)=>{
    switch(action.type){
        case actionTypes.GETTING_USER_START:
            return {
                ...state,
                loading:true,
                error:false,
            }
        case actionTypes.GETTING_USER_SUCCESS:
            return {
                ...state,
                loading:false,
                user: action.payload,
                error:false,
            }
        case actionTypes.GETTING_USER_ERROR:
            return {
                ...state,
                loading:false,
                error:true,
            }
        default:
            return state;
    }
}