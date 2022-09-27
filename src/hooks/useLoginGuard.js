import { useEffect } from "react";
import { useNavigate } from "react-router";
import useToken from "./useToken";

const useLoginGuard = ({ loggedIn, path }) => {
  const navigate = useNavigate();
  const { loggedIn: currentLoggedIn } = useToken();

  useEffect(() => {
    console.log({ loggedIn, path, currentLoggedIn })

    if (loggedIn === currentLoggedIn) {
      navigate(path);
    }
  }, []);
};

export default useLoginGuard;