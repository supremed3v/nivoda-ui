import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaBagShopping } from "react-icons/fa6";

import { RiAccountCircleLine } from "react-icons/ri";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = () => {
    const scrollTop = window.scrollY;
    const isScrolled = scrollTop > 20;
    setIsScrolled(isScrolled);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`${
        isScrolled ? "bg-black" : "bg-transparent"
      } fixed top-0 left-0 right-0 z-20 transition duration-300 ease-in-out`}
    >
      <div className="container mx-auto flex flex-wrap justify-between py-2 items-center">
        <div className="flex items-center">
          <Link
            to="/"
            className="flex title-font font-medium items-center text-white mb-4 md:mb-0"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="w-10 h-10 text-white p-2 bg-white rounded-full"
              viewBox="0 0 24 24"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
            </svg>
            <span
              className={`${
                isScrolled ? "text-white" : "text-black"
              } ml-3 text-xl`}
            >
              Diamond Store
            </span>
          </Link>
        </div>

        <div className="flex items-center">
          <Link to="/cart" className="mr-5">
            <FaBagShopping
              size="26px"
              //  color={isScrolled ? "#fff" : "#000"}
              style={{
                color: "white",
              }}
            />
          </Link>
          <Link to="/account" className="mr-5">
            <RiAccountCircleLine
              size="28px"
              style={{
                color: "white",
              }}
            />
          </Link>
        </div>
      </div>

      <div className="container mx-auto flex flex-wrap flex-col md:flex-row items-center">
        <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
          <Link
            to="/"
            className={`${
              isScrolled
                ? "text-white hover:text-gray-300"
                : "text-black hover:border-gray-500 border-transparent border-b-2"
            } mr-5 py-4 title-font font-medium`}
          >
            Home
          </Link>
          <Link
            to="/explore"
            className={`${
              isScrolled
                ? "text-white hover:text-gray-300"
                : "text-black hover:border-gray-500 border-transparent border-b-2"
            } mr-5 py-4 title-font font-medium`}
          >
            Explore
          </Link>
          <Link
            to="/cart"
            className={`${
              isScrolled
                ? "text-white hover:text-gray-300"
                : "text-black hover:border-gray-500 border-transparent border-b-2"
            } mr-5 py-4 title-font font-medium`}
          >
            Cart
          </Link>
          <Link
            to="/"
            className={`${
              isScrolled
                ? "text-white hover:text-gray-300"
                : "text-black hover:border-gray-500 border-transparent border-b-2"
            } mr-5 py-4 title-font font-medium`}
          >
            Fourth Link
          </Link>
        </nav>
      </div>
    </header>
  );
};
