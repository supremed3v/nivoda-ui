import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

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
        isScrolled ? "bg-black" : "bg-white"
      } fixed top-0 left-0 right-0 z-10 transition duration-300 ease-in-out`}
    >
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
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
        <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
          <Link
            to="/"
            className={`${
              isScrolled ? "text-white" : "text-black hover:text-gray-200"
            } mr-5 py-4 title-font font-medium`}
          >
            Home
          </Link>
          <Link
            to="/explore"
            className={`${
              isScrolled ? "text-white" : "text-black hover:text-gray-200"
            } mr-5 py-4 title-font font-medium`}
          >
            Explore
          </Link>
          <Link
            to="/"
            className={`${
              isScrolled ? "text-white" : "text-black hover:text-gray-200"
            } mr-5 py-4 title-font font-medium`}
          >
            Cart
          </Link>
          <Link
            to="/"
            className={`${
              isScrolled ? "text-white" : "text-black hover:text-gray-200"
            } mr-5 py-4 title-font font-medium`}
          >
            Fourth Link
          </Link>
        </nav>
        <button
          className={`inline-flex items-center text-black font-semibold ${
            isScrolled ? "bg-white text-black" : "bg-black text-white"
          } border-0 py-1 px-5 focus:outline-none hover:bg-gray-700 rounded text-base mt-4 md:mt-0`}
        >
          Login
        </button>
      </div>
    </header>
  );
};
