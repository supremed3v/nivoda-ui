import React, { useEffect, useState } from "react";
import { useNivodaDiamonds } from "../../context/ApiContext";
import Diamonds from "../../components/Diamonds";
import { Filter } from "../../components/Filter";
import { FadeInWhenVisible } from "../../components/libs/FadeInWhenVIsible";
import { CardsSkeleton } from "../../components/libs/skeleton";

export const Explore = () => {
  const {
    diamondsData,
    filteredDiamonds,
    clearFilter,
    setLabGrown,
    labGrown,
    loading,
    initialDiamondsData,
  } = useNivodaDiamonds();
  // Check if the filtered diamonds is empty
  const [diamondProp, setDiamondProp] = useState([]);

  useEffect(() => {
    if (filteredDiamonds === null || clearFilter === true) {
      setDiamondProp(initialDiamondsData);
    } else {
      setDiamondProp(filteredDiamonds);
    }
  }, [filteredDiamonds, initialDiamondsData, clearFilter]);

  const changeLabGrown = (value) => {
    setLabGrown(value);
  };

  return (
    <section className="mt-40 ">
      <div className="flex items-center justify-center w-[100%]">
        <button
          className={`${
            !labGrown && !loading
              ? "border-pink-500 border-2 border-spacing-6 text-pink-500"
              : "text-black bg-white border-gray-300"
          } px-4 py-2 m-1 rounded-md border-2 focus:outline-none`}
          onClick={() => changeLabGrown(false)}
        >
          Natural
        </button>
        <button
          className={`${
            labGrown && !loading
              ? "border-pink-500 border-2 border-spacing-6 text-pink-500"
              : "text-black bg-white border-gray-300"
          } px-4 py-2 m-1 rounded-md border-2 focus:outline-none`}
          onClick={() => changeLabGrown(true)}
        >
          Lab Grown
        </button>
      </div>
      {loading ? (
        <>
          <Filter />
          <CardsSkeleton />
        </>
      ) : (
        <>
          <Filter />
          <Diamonds diamondsData={diamondProp} setLimit={false} />
        </>
      )}
    </section>
  );
};
