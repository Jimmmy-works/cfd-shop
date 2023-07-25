const dogReducer = (state = null, action) => {
  let newDog;
  switch (action.type) {
    case "UPDATE_DOG":
      newDog = action.payload;
      return newDog;
    default:
      return state;
  }
};

export default dogReducer;
