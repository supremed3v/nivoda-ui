// Purpose: Hero component for the landing page
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
export const Hero = () => {
  return (
    <section className="text-gray-400 body-font">
      <div className="container mx-auto flex px-5 py-10 md:flex-row flex-col items-center">
        <motion.div
          initial={{ x: -200 }}
          animate={{ x: 0 }}
          transition={{ type: "ease", stiffness: 100, duration: 2 }}
          className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center"
        >
          <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium py-10">
            The World's Largest Diamond Store
          </h1>
          <div className="flex w-full md:justify-start justify-center items-center">
            <div className="relative mr-4 md:w-full lg:w-full xl:w-1/2 w-2/4">
              <input
                type="text"
                id="hero-field"
                name="hero-field"
                className="w-full rounded-full bg-opacity-40 border border-gray-700 focus:ring-2 focus:border-gray-300 focus:bg-transparent  text-base outline-none text-gray-100 py-2 px-3 leading-8 transition-colors duration-200 ease-in-out"
                placeholder="Enter your email"
              />
            </div>
            <Link
              to={"/explore"}
              className="inline-flex bg-black text-white border-0 py-2 px-6 focus:outline-none hover:bg-gray-700 rounded-lg text-lg"
            >
              Explore Collections
            </Link>
          </div>

          <div className="flex lg:flex-row md:flex-col text-gray-300"></div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: "ease", duration: 2 }}
          className="lg:max-w-3xl lg:w-full md:w-1/2 w-5/6"
        >
          <img
            className="object-cover object-center rounded"
            alt="hero"
            src="https://images.unsplash.com/photo-1505686183080-0020a5979305?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          />
        </motion.div>
      </div>
    </section>
  );
};
