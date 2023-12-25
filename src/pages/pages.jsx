import React from "react";
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

export const Pages = () => {
  const isAuthenticated = useAuthContext();
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/diamond/:id" element={<SingleDiamond />} />
        <Route path="/explore" element={<Explore />} />
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
      </Routes>
      <Footer />
    </>
  );
};
