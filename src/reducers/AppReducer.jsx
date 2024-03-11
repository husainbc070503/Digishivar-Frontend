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

    case "SET_CART":
      return { ...state, cart: [...action.payload] };

    case "SET_LIST":
      return { ...state, wishlist: [...action.payload] };

    case "ADD_TO_CART":
      return {
        ...state,
        cart: [
          ...state.cart,
          {
            ...action.payload.productToAdd,
            userQuantity: action.payload.quantity,
            userQuantityType: action.payload.quantityType,
          },
        ],
      };

    case "INCREMENT_QUANTITY":
      let tempCart = state.cart;
      tempCart = tempCart.map((item) => {
        if (item?._id === action.payload.id) {
          return {
            ...item,
            userQuantity:
              item.userQuantity + 1 < action.payload.quantity
                ? item.userQuantity + 1
                : action.payload.quantity,
          };
        }

        return item;
      });

      return {
        ...state,
        cart: tempCart,
      };

    case "DECREMENT_QUANTITY":
      let tempCart1 = state.cart;
      tempCart1 = tempCart1.map((item) => {
        if (item?._id === action.payload) {
          return {
            ...item,
            userQuantity: item.userQuantity - 1 > 1 ? item.userQuantity - 1 : 1,
          };
        }

        return item;
      });

      return {
        ...state,
        cart: tempCart1,
      };

    case "CHANGE_QUANTITY_TYPE":
      let tempCart2 = state.cart;
      tempCart2 = tempCart2.map((item) => {
        if (item?._id === action.payload.id) {
          return {
            ...item,
            userQuantityType: action.payload.value,
          };
        }

        return item;
      });

      return {
        ...state,
        cart: tempCart2,
      };

    case "ADD_TO_LIST":
      return { ...state, wishlist: [...state.wishlist, action.payload] };

    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter((product) => product._id !== action.payload),
      };

    case "CLEAR_CART":
      return { ...state, cart: [] };

    case "REMOVE_FROM_LIST":
      return {
        ...state,
        wishlist: state.wishlist.filter(
          (product) => product._id !== action.payload
        ),
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

    case "SET_ORDERS":
      return {
        ...state,
        orders: [...action.payload],
      };

    case "ADD_ORDER":
      return {
        ...state,
        orders: [...state.orders, action.payload],
      };

    default:
      return state;
  }
};

export default AppReducer;
