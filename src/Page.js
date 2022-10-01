import { createContext, useState } from "react";
import { Outlet } from "react-router-dom";
import useToken from "./hooks/useToken";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import useLoginGuard from "./hooks/useLoginGuard";

export const cartContext = createContext(null)

const Page = () => {
  useLoginGuard(false, "/home")
  const { loggedIn } = useToken();
  const [cartList, setCartList] = useState([]);

  return (
    <div>
      <cartContext.Provider value={{cartList, setCartList}}>
        <Header />
            <div className="main">
              {/* {loggedIn ? <Outlet /> : <Home />} */}
              <Outlet />
            </div>
        <Footer />
      </cartContext.Provider>
    </div>
  );
};

export default Page;