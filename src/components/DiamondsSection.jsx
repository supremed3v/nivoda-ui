import React, { Suspense } from "react";
import { useNivodaDiamonds } from "../context/ApiContext";
// import DiamondSkeleton from "./libs/skeleton";
import Diamonds from "./Diamonds";
import { CardsSkeleton } from "./libs/skeleton";

export const DiamondsSection = () => {
  const { diamondsData } = useNivodaDiamonds();
  return (
    <Suspense fallback={<CardsSkeleton />}>
      <Diamonds diamondsData={diamondsData} setLimit={true} />
    </Suspense>
  );
};
