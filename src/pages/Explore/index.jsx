import React from "react";
import { useNivodaDiamonds } from "../../context/ApiContext";
import Diamonds from "../../components/Diamonds";
import { Filter } from "../../components/Filter";

export const Explore = () => {
  const diamondsData = useNivodaDiamonds();
  return (
    <section>
      <Filter />
      <Diamonds diamondsData={diamondsData} setLimit={false} />
    </section>
  );
};
