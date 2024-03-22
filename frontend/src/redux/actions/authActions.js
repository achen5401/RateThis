export const login = (firstName, email) => ({
    type: 'LOGIN',
    firstName: firstName,
    email: email
  });
  
  export const logout = () => ({
    type: 'LOGOUT',
  });
  
  export const checkAuthentication = () => ({
    type: 'CHECK_AUTHENTICATION',
  });