const AppReducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.payload };

    case "REMOVE_USER":
      return { ...state, user: {} };

    case "SET_PRICES":
      return { ...state, prices: [...action.payload] };
  }
};

export default AppReducer;
