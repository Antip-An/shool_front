import { useEffect, useState } from "react";
import { getData } from "../utils/network";

import useToken from "./useToken";

const useUser = () => {
    const { token } = useToken();
    const [userData, setUserData] = useState();
    useEffect(()=>{
        getData('/users/profile').then(({user})=>setUserData(user))
    },[token])

    return { userData };
  };
  
  export default useUser;