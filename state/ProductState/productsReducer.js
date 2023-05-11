import actionTypes from "./actionTypes";

export const initialState = {
  loading: false,
  products: {},
  error: false,
  cart: [],
};
export const productsReducer = (state, action) => {
  // find selected products
  const selectedProduct = state.cart.find(
    (product) => product._id === action.payload?._id
  );
  switch (action.type) {
    case actionTypes.FETCHING_START:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case actionTypes.FETCHING_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.payload,
        error: false,
      };
    case actionTypes.FETCHING_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
      };
    case actionTypes.ADD_TO_CART:
        console.log(selectedProduct)
      if (selectedProduct) {
        const newCart = state.cart.filter(
          (product) => product._id !== selectedProduct._id
        );

        selectedProduct.quantity += 1;

        return {
          ...state,
          cart: [... newCart, selectedProduct],
        };
      }
      return {
        ...state,
        cart: [...state.cart, { ...action.payload, quantity: 1 }],
      };
    case actionTypes.REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter(
          (product) => product._id !== action.payload?._id
        ),
      };
    case actionTypes.DECREMENT_CART:
        if (selectedProduct.quantity > 1) {
            const newCart = state.cart.filter(
              (product) => product._id !== selectedProduct._id
            );
            selectedProduct.quantity = selectedProduct.quantity - 1;
    
            return {
              ...state,
              cart: [...newCart, selectedProduct],
            };
          }
          return {
            ...state,
            cart: state.cart.filter(
              (product) => product._id !== action.payload._id
            ),
      };
    default:
      return state;
  }
};
