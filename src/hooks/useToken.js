const useToken = () => {
    const token = localStorage.getItem("token") || null;
    const loggedIn = Boolean(token);
    return { token, loggedIn };
  };
  
  export default useToken;