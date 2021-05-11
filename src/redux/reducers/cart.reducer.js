const initialState = {
  cartList: {
    data: [],
    load: false,
    error: '',
  }
};

export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case 'GET_CART_LIST_REQUEST': {
      return {
        ...state,
        cartList: {
          ...state.cartList,
          load: true,
        },
      }
    }
    case 'GET_CART_LIST_SUCCESS': {
      const { data } = action.payload;
      return {
        ...state,
        cartList: {
          ...state.cartList,
          data: data,
          load: false,
        },
      }
    }
    case 'GET_CART_LIST_FAIL': {
      const { error } = action.payload;
      return {
        ...state,
        cartList: {
          ...state.cartList,
          load: false,
          error: error,
        },
      }
    }
    case 'ADD_TO_CART_REQUEST': {
      return {
        ...state,
        cartList: {
          ...state.cartList,
          load: true,
        }
      }
    }

    case 'ADD_TO_CART_SUCCESS': {
      const { data } = action.payload;
      return {
        ...state,
        cartList: {
          ...state.cartList,
          load: false,
          data: data,
        }
      }
    }

    case 'ADD_TO_CART_FAIL': {
      const { error } = action.payload;
      return {
        ...state,
        cartList: {
          ...state.cartList,
          load: false,
          error: error,
        }
      }
    }
    default: {
      return state;
    }
  }
}
