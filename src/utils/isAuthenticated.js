import { store } from '../redux/store';

export const isAuthenticated = () => {
  return store.getState().auth.tokens;
};
