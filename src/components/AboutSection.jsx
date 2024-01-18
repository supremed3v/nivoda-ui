import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import ReadMoreSvg from "../assets/readmore.svg";

export const AboutSection = () => {
  return (
    <section className="text-gray-400 body-font h-screen flex items-center bg-black bg-center w-full">
      <div className="w-full h-full flex  md:flex-row flex-col items-center">
        {/* Left Side (Image) */}
        <motion.div
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "ease", duration: 2 }}
          className="lg:w-1/2 h-full bg-cover bg-center"
          style={{
            backgroundImage:
              "url(https://design313.testingmocklink.online/wp-content/uploads/2023/09/Rectangle-5482.png)",
            backgroundRepeat: "no-repeat",
          }}
        />

        {/* Right Side (Content) */}
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: "ease", duration: 2 }}
          className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start px-20 md:text-left mb-16 md:mb-0 items-center text-center"
        >
          <h1 className="title-font sm:text-3xl text-4xl mb-4 font-medium py-10 text-white">
            Jewellers
          </h1>
          <p className="mb-8 leading-relaxed text-lg text-white">
            We specialize in ideal cut diamonds. GIA, EGL or AGS certified
            directly imported from Belgium, Russia, and Israel. Brighten up your
            life with Marx Jewelers and live with the sparkle of precious gems
            and hand crafted jewelry.
            <br />
            <br />
            With the direct importing of diamonds and in house manufacturing, we
            can offer you tremendous savings. We have the right combination of
            highly skilled European craftsmanship and cutting edge technology,
            delivering unparalleled quality.
          </p>

          <div className="flex w-full md:justify-start justify-center items-center">
            <Link
              to={"/explore"}
              className="inline-flex bg-white font-semibold gap-2 items-center text-black border-0 py-2 px-6 focus:outline-none hover:bg-gray-100 rounded-sm text-sm"
            >
              Read More
              <img src={ReadMoreSvg} alt="" srcset="" width={20} height={20} />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
