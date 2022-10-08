import { createContext, useState } from "react";
import { Outlet } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";

import useLoginGuard from "./hooks/useLoginGuard";
import useToken from "./hooks/useToken";

export const cartContext = createContext(null);

const Page = () => {
  useLoginGuard(false, "/home");
  const { loggedIn } = useToken();
  const [cartList, setCartList] = useState([]);

  return (
    <div>
        <cartContext.Provider value={{ cartList, setCartList }}>
          <Header />
          <div className="main">
            <Outlet />
          </div>
          <Footer />
        </cartContext.Provider>
    </div>
  );
};

export default Page;
