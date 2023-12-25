import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { CardsSkeleton } from "./libs/skeleton";
import previewImage from "../assets/nopreview.jpg";
import { useNivodaDiamonds } from "../context/ApiContext";

const DiamondCard = ({ diamond }) => {
  const { labGrown } = useNivodaDiamonds();
  return (
    <motion.div
      key={diamond.id}
      className="lg:w-1/4 md:w-1/2 p-6 w-full
        hover:shadow-xl hover:scale-105 transition duration-300 ease-in-out
      "
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      <Link
        to={`/diamond/${diamond.id}`}
        className="block relative h-60 rounded overflow-hidden"
      >
        <img
          alt="Diamond"
          className="object-cover object-center w-full h-full block"
          src={diamond.image || previewImage}
        />
      </Link>
      <div className="mt-4">
        <h2 className="text-gray-700 title-font text-lg font-medium">
          {diamond.certificate.shape} {diamond.certificate.carats}ct{" "}
          {diamond.certificate.cut} {diamond.certificate.color}{" "}
          {diamond.certificate.clarity}
        </h2>
        <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
          Delivery Time: {diamond.delivery_time.min_business_days} -{" "}
          {diamond.delivery_time.max_business_days} business days
        </h3>
        {labGrown ? (
          <h3 className="text-pink-500 text-xs tracking-widest title-font mb-1">
            Lab Grown
          </h3>
        ) : null}
        <hr
          className="
        border-gray-300
        my-2
        border-solid
        "
        />
        <div className="flex align-middle items-center w-full">
          <h3 className=" text-pretty font-bold text-gray-600 text-lg mb-1 w-full">
            Total Price
          </h3>
          <span className="ml-auto text-pretty font-bold text-gray-600 text-xl ">
            ${(diamond.price / 100).toLocaleString("en-US")}
          </span>
        </div>

        <div className="inline-flex items-center justify-center w-full text-center">
          <Link
            to={`/diamond/${diamond.id}`}
            className="inline-flex items-center text-white bg-gray-800 border-0 py-3 px-3 focus:outline-none hover:bg-gray-700 rounded-lg text-base mt-4 md:mt-0 p-5 w-full text-center"
            style={{
              textAlign: "center",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            View Diamond
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default function Diamonds({ diamondsData, setLimit }) {
  const limitedDiamondsData = diamondsData ? diamondsData?.slice(0, 6) : [];

  return (
    <div className="container px-5 mx-auto">
      {diamondsData !== null && diamondsData.length !== 0 ? (
        <div className="flex flex-wrap -m-4">
          {setLimit
            ? limitedDiamondsData.map((diamond) => (
                <DiamondCard key={diamond.id} diamond={diamond} />
              ))
            : diamondsData.map((diamond) => (
                <DiamondCard key={diamond.id} diamond={diamond} />
              ))}
        </div>
      ) : null}

      {diamondsData !== null && diamondsData.length === 0 ? (
        <div className="flex flex-wrap -m-4">
          <div className="lg:w-1/4 md:w-1/2 p-6 w-full">
            <h2 className="text-gray-700 title-font text-lg font-medium">
              No Diamonds Found
            </h2>
          </div>
        </div>
      ) : null}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        style={{
          textAlign: "center",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "2rem",
        }}
      >
        {setLimit === true ? (
          <Link
            to="/explore"
            className="text-white bg-gray-900 border-0 py-3 px-3 text-lg focus:outline-none hover:bg-gray-700 rounded-lg md:mt-0 p-5 text-center"
          >
            View All Diamonds
          </Link>
        ) : diamondsData === null ? (
          <CardsSkeleton />
        ) : null}
      </motion.div>
    </div>
  );
}
