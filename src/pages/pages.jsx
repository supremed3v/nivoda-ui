import { Routes, Route } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Home } from "./Home";
import { SingleDiamond } from "./SingleDiamond";
import { Explore } from "./Explore";
import { Footer } from "../components/Footer";
import { Profile } from "./User/Profile";
import ProtectedRoutes from "../components/libs/ProtectedRoutes";
import { useAuthContext } from "../context/AuthContext";
import { LoginSignup } from "./User/LoginSignup";
import { Cart } from "./Cart";
import { Checkout } from "./Checkout";
import { Success } from "./Checkout/Success";

export const Pages = () => {
  const isAuthenticated = useAuthContext();
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/diamond/:id" element={<SingleDiamond />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/cart" element={<Cart />} />
        <Route
          element={
            <ProtectedRoutes
              isAuthenticated={isAuthenticated.isAuthenticated}
            />
          }
        >
          <Route path="/account" element={<Profile />} />
        </Route>
        <Route path="/login" element={<LoginSignup />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/checkout/success" element={<Success />} />
      </Routes>
      <Footer />
    </>
  );
};
