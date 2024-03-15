const initialState = {
    cards: null
  };
  
  const storeReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'LOAD_CARDS':
        return {
          ...state,
          cards: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default storeReducer;