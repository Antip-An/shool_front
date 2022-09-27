const useRole = () => {
    const role = localStorage.getItem("role") || null;
    const loggedIn = Boolean(role);
    return { role, loggedIn };
  };
  
  export default useRole;