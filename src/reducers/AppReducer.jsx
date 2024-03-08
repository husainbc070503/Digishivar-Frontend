const AppReducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.payload };

    case "SET_USERS":
      return { ...state, users: [...action.payload] };

    case "REMOVE_USER":
      return { ...state, user: {} };

    case "SET_PRICES":
      return { ...state, prices: [...action.payload] };

    case "SET_PRODUCTS":
      return { ...state, products: [...action.payload] };

    case "ADD_PRODUCT":
      return { ...state, products: [...state.products, action.payload] };

    case "ADD_TO_CART":
      return { ...state, cart: [...state.cart, action.payload] };

    case "UPDATE_PRODUCT":
      let arrPro = state.products;
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

    case "SET_BLOGS":
      return { ...state, blogs: [...action.payload] };

    case "ADD_BLOG":
      return { ...state, blogs: [...state.products, action.payload] };

    case "UPDATE_BLOG":
      let arrBlog = state.blogs;
      arrBlog = arrBlog.map((item) => {
        if (item?._id === action.payload.id) return action.payload.blog;
        return item;
      });

      return { ...state, blogs: arrBlog };

    case "DELETE_BLOG":
      return {
        ...state,
        blogs: state.blogs.filter((item) => item._id !== action.payload),
      };

    case "SET_CONTACTS":
      return { ...state, contacts: action.payload };

    case "DELETE_CONTACT":
      return {
        ...state,
        contacts: state.contacts.filter((item) => item?._id !== action.payload),
      };

    default:
      return state;
  }
};

export default AppReducer;
