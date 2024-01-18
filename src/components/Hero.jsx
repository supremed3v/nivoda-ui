// Purpose: Hero component for the landing page
import { motion } from "framer-motion";
import RightArrow from "../assets/rightarrow.svg";
import { Link } from "react-router-dom";
export const Hero = () => {
  return (
    <section className="text-gray-400 body-font flex items-center">
      <div className="container mx-auto flex px-5 py-[120px] md:flex-row flex-col items-center h-full">
        <motion.div
          initial={{ x: -200 }}
          animate={{ x: 0 }}
          transition={{ type: "ease", stiffness: 100, duration: 2 }}
          className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center"
        >
          <h1 className="title-font sm:text-4xl text-4xl mb-4 font-medium py-10 text-black">
            The World's Largest Diamond Store
          </h1>
          <p className="mb-8 leading-relaxed text-xl text-black">
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout. The point
            of using Lorem Ipsum is that it has a more-or-less normal
            distribution of letters, as opposed to using ‘Content here, content
            here’, making it look like readable English.
          </p>
          <div className="flex w-full md:justify-start justify-center items-center">
            <Link
              to={"/explore"}
              className="inline-flex gap-2 text-sm uppercase font-semibold bg-black text-white border-0 py-2 px-6 focus:outline-none hover:bg-gray-700 rounded-sm"
            >
              Explore Collections
              <img
                src={RightArrow}
                alt=""
                width={20}
                height={20}
                // style={{ marginLeft: 10 }}
              />
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: "ease", duration: 2 }}
          className="lg:max-w-3xl lg:w-full md:w-1/2 w-5/6"
        >
          <img
            className="object-cover object-center rounded h-full" // Set height to 100%
            alt="hero"
            src="https://design313.testingmocklink.online/wp-content/uploads/2023/09/ezgif-3-56d294b8ff.webp"
          />
        </motion.div>
      </div>
    </section>
  );
};
