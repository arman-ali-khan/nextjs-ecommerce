import axios from "axios";
import actionTypes from "./actionTypes";

export const initialState = {
  loading: false,
  products: {},
  error: false,
  cart: [],
  stocks: [],
  draws: []
};
export const productsReducer = (state, action) => {
  let id = action.payload?.id;
  // find selected products
  const selectedProduct = state.cart.find(
    (product) => product._id === action.payload?._id
  );
  // find selected stock
  const selectedStocks = state.stocks.find(
    (product) => product._id === action.payload?._id
  );
  // find selected stock
  const selectedDraw = state.draws.find(
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
      if (selectedProduct) {
        const newCart = state.cart.filter(
          (product) => product._id !== selectedProduct._id
        );

        selectedProduct.quantity += 1;

        return {
          ...state,
          cart: [...newCart, selectedProduct],
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
    // stock
    case actionTypes.ADD_TO_STOCK:
      if (selectedStocks) {
        const newStock = state.stocks.filter(
          (product) => product._id !== selectedStocks._id
        );
      
        selectedStocks.quantity += 1;

       
        return {
          ...state,
          stocks: [...newStock, selectedStocks],
        };
      }
      // stock count down per click
      const stockDown = parseInt(action.payload.stock);

      axios
        .patch(`/api/updateStock/update?id=${id}`, {
          stock: (stockDown - 1).toString(),
        })
        .then((res) => {
          console.log(res.data);
        });

      return {
        ...state,
        stocks: [...state.stocks, { ...action.payload, quantity: 1 }],
      };
    case actionTypes.REMOVE_FROM_STOCK:
      const removeStock = parseInt(action.payload.stock);
      axios
            .patch(`/api/updateStock/update?id=${id}`, {
              stock: (removeStock + state.stocks.length).toString(),
            })
            .then((res) => {
              console.log(res.data);
            });
      return {
        ...state,
        stocks: state.stocks.filter(
          (product) => product._id !== action.payload?._id
        ),
      };
    case actionTypes.DECREMENT_STOCK:
      if (selectedStocks.quantity > 1) {
        const newStock = state.stocks.filter(
          (product) => product._id !== selectedStocks._id
        );
        selectedStocks.quantity = selectedStocks.quantity - 1;

        return {
          ...state,
          stocks: [...newStock, selectedStocks],
        };
      }
 // stock count up per click
      const stockUP = parseInt(action.payload.stock);
      axios
        .patch(`/api/updateStock/update?id=${id}`, {
          stock: (stockUP).toString(),
        })
        .then((res) => {
          console.log(res.data);
        });
      console.log(id);
      return {
        ...state,
        stocks: state.stocks.filter(
          (product) => product._id !== action.payload._id
        ),
      };
 // Draw
    case actionTypes.ADD_TO_DRAW:
      if (selectedStocks) {
        const newDraw = state.draws.filter(
          (product) => product._id !== selectedStocks._id
        );

        selectedStocks.quantity += 1;
        return {
          ...state,
          stocks: [...newDraw, selectedStocks],
        };
      }
      // draw count down per click
      const drawDown = parseInt(action.payload.draw);

      axios
        .patch(`/api/updateDraw/update?id=${id}`, {
          stock: (drawDown - 1).toString(),
        })
        .then((res) => {
          console.log(res.data);
        });

      return {
        ...state,
        draws: [...state.draws, { ...action.payload, quantity: 1 }],
      };
    case actionTypes.REMOVE_FROM_STOCK:
      return {
        ...state,
        draws: state.draws.filter(
          (product) => product._id !== action.payload?._id
        ),
      };
    case actionTypes.DECREMENT_STOCK:
      if (selectedStocks.quantity > 1) {
        const newDraw = state.draws.filter(
          (product) => product._id !== selectedStocks._id
        );
        selectedStocks.quantity = selectedStocks.quantity - 1;

        return {
          ...state,
          stocks: [...newDraw, selectedStocks],
        };
      }
 // draw count up per click
      const drawUp = parseInt(action.payload.stock);
      axios
        .patch(`/api/updateStock/update?id=${id}`, {
          draw: (drawUp).toString(),
        })
        .then((res) => {
          console.log(res.data);
        });
      return {
        ...state,
        draws: state.draws.filter(
          (product) => product._id !== action.payload._id
        ),
      };

    default:
      return state;
  }
};
