const initialState = {
  isLoginModalOpen: false,
};

const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'TOGGLE_LOGIN_MODAL':
      return { ...state, isLoginModalOpen: !state.isLoginModalOpen };
    default:
      return state;
  }
};

export default modalReducer;