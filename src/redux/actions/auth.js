export const loginSuccess = (user, tokens, seller) => ({
  type: 'LOGIN_SUCCESS',
  payload: { user, tokens, seller },
});

export const sellerSuccess = (seller) => ({
  type: 'SELLER_SUCCESS',
  payload: { seller },
});

export const updateUser = (payload) => ({
  type: 'UPDATE_USER',
  payload: payload,
});

export const logout = () => ({
  type: 'LOGOUT',
});
