// authReducer.js
const initialState = {
  user: null,
  seller: null,
  tokens: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload.user,
        tokens: action.payload.tokens,
        seller: action.payload.seller,
      };

    case 'SELLER_SUCCESS':
      return {
        ...state,
        seller: action.payload.seller,
      };

    case 'LOGOUT':
      return {
        ...state,
        user: null,
        tokens: null,
        seller: null,
      };
    default:
      return state;
  }
};

export default authReducer;
