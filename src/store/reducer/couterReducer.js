const initState = {
  couter: 5,
};

const couterReducer = (state = initState, action) => {
  let newState;
  switch (action.type) {
    case "INCREMENT":
      newState = { ...state, couter: state.couter + action.payload };
      return newState;
    case "DECREMENT":
      newState = { ...state, couter: state.couter - action.payload };
      return newState;

    default:
      return state;
  }
};

export default couterReducer;
