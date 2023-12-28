import { Routes, Route } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Home } from "./Home";
import { SingleDiamond } from "./SingleDiamond";
import { Explore } from "./Explore";
import { Footer } from "../components/Footer";
import { Account, Profile } from "./User/Profile";
import ProtectedRoutes from "../components/libs/ProtectedRoutes";
import { useAuthContext } from "../context/AuthContext";
import { LoginSignup } from "./User/LoginSignup";
import { Cart } from "./Cart";
import { Checkout } from "./Checkout";
import { Success } from "./Checkout/Success";
import { Orders } from "./User/Orders";
import { SingleOrder } from "./User/SingleOrder";
import { AdminAccount, AdminProfile } from "./User/AdminProfile";
import { useEffect } from "react";
import axios from "axios";
import { AdminOrders } from "./User/AdminOrders";
import { AdminSingleOrder } from "./User/AdminSingleOrder";

export const Pages = () => {
  const { isAuthenticated, userRole, setUserRole, user } = useAuthContext();
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (userData && userData.token && user) {
      axios
        .get(
          `https://nivodabackend.beartales.net/index.php/wp-json/wp/v2/user/role?user_id=${user.id}`,
          {
            headers: {
              Authorization: `Bearer ${userData.token}`,
            },
          }
        )
        .then((response) => {
          setUserRole(response.data.role);
          console.log(userRole);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [isAuthenticated, user, userRole, setUserRole]);
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/diamond/:id" element={<SingleDiamond />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/cart" element={<Cart />} />
        <Route element={<ProtectedRoutes isAuthenticated={isAuthenticated} />}>
          {userRole !== "administrator" ? (
            <Route path="/account" element={<Profile />}>
              <Route path="/account" element={<Account />} />
              <Route path="orders" element={<Orders />} />
              <Route path="orders/:id" element={<SingleOrder />} />
            </Route>
          ) : (
            <Route path="/admin" element={<AdminProfile />}>
              <Route path="/admin" element={<AdminAccount />} />
              <Route path="orders" element={<AdminOrders />} />
              <Route path="orders/:id" element={<AdminSingleOrder />} />
            </Route>
          )}
        </Route>
        <Route path="/login" element={<LoginSignup />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/checkout/success" element={<Success />} />
      </Routes>
      <Footer />
    </>
  );
};
