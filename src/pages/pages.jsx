import React from "react";
import { Routes, Route } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Home } from "./Home";
import { SingleDiamond } from "./SingleDiamond";
import { Explore } from "./Explore";
import { Footer } from "../components/Footer";

export const Pages = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/diamond/:id" element={<SingleDiamond />} />
        <Route path="/explore" element={<Explore />} />
      </Routes>
      <Footer />
    </>
  );
};
