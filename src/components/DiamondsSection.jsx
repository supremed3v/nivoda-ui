import React, { Suspense } from "react";
import { useNivodaDiamonds } from "../context/ApiContext";
// import DiamondSkeleton from "./libs/skeleton";
import Diamonds from "./Diamonds";
import { CardsSkeleton } from "./libs/skeleton";
import { FadeInWhenVisible } from "./libs/FadeInWhenVIsible";

const fadeInVariants = {
  visible: { opacity: 1, scale: 1 },
  hidden: { opacity: 0, scale: 0 },
};

export const DiamondsSection = () => {
  const { diamondsData } = useNivodaDiamonds();
  return (
    <FadeInWhenVisible animationVariants={fadeInVariants}>
      <Diamonds diamondsData={diamondsData} setLimit={true} />
    </FadeInWhenVisible>
  );
};
