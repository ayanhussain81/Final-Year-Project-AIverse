export const loginSuccess = (user, tokens) => ({
  type: 'LOGIN_SUCCESS',
  payload: { user, tokens },
});

export const logout = () => ({
  type: 'LOGOUT',
});
