const initialState = {
    cards: null,
    cardToEdit: null 
  };
  
  const storeReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'LOAD_CARDS':
        return {
          ...state,
          cards: action.payload,
        };
      case 'EDIT_CARD':
        return {
          ...state,
          cardToEdit: action.payload
        }
      default:
        return state;
    }
  };
  
  export default storeReducer;