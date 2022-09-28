import { createContext, useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import useToken from "./hooks/useToken";
import useLoginGuard from "./hooks/useLoginGuard";

export const cartContext = createContext(null)

const Page = () => {
  const [cartList, setCartList] = useState([]);

  const { loggedIn } = useToken(); 
  useLoginGuard({ loggedIn: false, path: "/" });

  const login = loggedIn;

  return (
    <div>
      <cartContext.Provider value={{cartList, setCartList}}>
        {login ? <Header /> : null}
        <Header />
            <div className="main">
                <Outlet />
            </div>
        {login ? <Footer /> : null}
        <Footer />
      </cartContext.Provider>
    </div>
  );
};

export default Page;