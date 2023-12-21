import React, { useEffect, useState } from "react";
import { useNivodaDiamonds } from "../../context/ApiContext";
import Diamonds from "../../components/Diamonds";
import { Filter } from "../../components/Filter";

export const Explore = () => {
  const { diamondsData, filteredDiamonds, clearFilter } = useNivodaDiamonds();
  // Check if the filtered diamonds is empty
  const [diamondProp, setDiamondProp] = useState([]);

  useEffect(() => {
    if (filteredDiamonds.length === 0 && clearFilter === true) {
      setDiamondProp(diamondsData);
    } else {
      setDiamondProp(filteredDiamonds);
    }
  }, [filteredDiamonds, diamondsData, clearFilter]);

  return (
    <section>
      <Filter />
      <Diamonds diamondsData={diamondProp} setLimit={false} />
    </section>
  );
};
