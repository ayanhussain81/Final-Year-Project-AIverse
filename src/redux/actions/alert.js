export const showAlert = (message, type) => {
  return {
    type: 'SHOW_ALERT',
    payload: { message, type },
  };
};

export const hideAlert = () => {
  return {
    type: 'HIDE_ALERT',
  };
};
