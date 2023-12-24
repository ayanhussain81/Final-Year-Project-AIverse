const initialState = {
  message: '',
  type: '',
};

const alertReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SHOW_ALERT':
      return {
        message: action.payload.message,
        type: action.payload.type,
      };
    case 'HIDE_ALERT':
      return {
        message: '',
        type: '',
      };
    default:
      return state;
  }
};

export default alertReducer;
