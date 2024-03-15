const initialState = {
    isLoggedIn: false,
    username: null,
  };
  
  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'LOGIN':
        return {
          ...state,
          username: action.payload,
          isLoggedIn: true,
        };
      case 'LOGOUT':
        return {
          ...state,
          isLoggedIn: false,
        };
      case 'CHECK_AUTHENTICATION':
        // Logic to check authentication status from backend
        // Update state based on the result
        return state;
      default:
        return state;
    }
  };
  
  export default authReducer;