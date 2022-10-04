import { useEffect, useState } from "react";
import useToken from "./useToken";
import { getData } from "../utils/network";

const useUser = () => {
    const { token } = useToken();
    const [userData, setUserData] = useState();
    useEffect(()=>{
        getData('/users/profile').then(({user})=>setUserData(user))
    },[token])

    return { userData };
  };
  
  export default useUser;