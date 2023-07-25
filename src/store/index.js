import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import couterReducer from "./reducer/couterReducer";
import dogReducer from "./reducer/dogReducer";
import { configureStore } from "@reduxjs/toolkit";
import { ENV } from "@/contants/environment";
import { authReducer } from "./reducer/authReducer";
import { cartReducer } from "./reducer/cartReducer";
import { orderReducer } from "./reducer/orderReducer";
// compbine Reducer
// const rootRecucer = combineReducers({
//   couter: couterReducer,
//   dog: dogReducer,
// });

// const middleware = (store) => (next) => (action) => {
//   if (typeof action === "function") {
//     action(store.dispatch);
//     return;
//   }
//   next(action);
// };
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ && compose;
// const store = config(
//   rootRecucer,
//   //   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),

//   composeEnhancers(
//     applyMiddleware(middleware),
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//   )
// );
const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    order: orderReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(thunkMiddleware),
  devTools: ENV === "development",
});
export default store;
