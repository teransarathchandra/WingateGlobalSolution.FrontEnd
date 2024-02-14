export default interface AuthActions {
  auth: {
    error: {
      email: string;
      password: string;
      message: string;
    };
    isAuthenticated: string;
  };
}
