const AppReducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.payload };

    case "REMOVE_USER":
      return { ...state, user: {} };

    case "SET_PRICES":
      return { ...state, prices: [...action.payload] };

    case "SET_PRODUCTS":
      return { ...state, products: [...action.payload] };

    case "ADD_PRODUCT":
      return { ...state, products: [...state.products, action.payload] };

    case "UPDATE_PRODUCT":
      const arrPro = state.products;
      arrPro = arrPro.map((item) => {
        if (item?._id === action.payload.id) return action.payload.product;
        return item;
      });

      return { ...state, products: arrPro };

    case "DELETE_PRODUCT":
      return {
        ...state,
        products: state.products.filter((item) => item._id !== action.payload),
      };

    default:
      return state;
  }
};

export default AppReducer;
