// authReducer.js
const initialState = {
  user: null,
  tokens: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload.user,
        tokens: action.payload.tokens,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        tokens: null,
      };
    default:
      return state;
  }
};

export default authReducer;
