// path-to-your-context-file.js

import { createContext, useContext, useEffect, useState } from "react";

const NivodaDiamondsContext = createContext();

export const NivodaDiamondsProvider = ({ children }) => {
  const [diamondsData, setDiamondsData] = useState(null);
  const [filteredDiamonds, setFilteredDiamonds] = useState(null);
  const [clearFilter, setClearFilter] = useState(false);
  const [labGrown, setLabGrown] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sortOrder, setSortOrder] = useState("ASC");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://integrations.nivoda.net/graphql-loupe360",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              query: `
                            {
                                authenticate {
                                    username_and_password(username: "${
                                      import.meta.env.VITE_AUTH_EMAIL
                                    }", password: "${
                import.meta.env.VITE_AUTH_PASSWORD
              }") {
                                        token
                                    }
                                }
                            }
                        `,
            }),
          }
        );

        const authData = await response.json();

        if (authData.errors) {
          console.error("Nivoda Authentication Error:", authData.errors);
          setLoading(false);
          return;
        }

        const token = authData.data.authenticate.username_and_password.token;

        const diamondsResponse = await fetch(
          "https://integrations.nivoda.net/graphql-loupe360",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              query: `
                            {
                                diamonds_by_query(
                                    query: {
                                        labgrown: ${labGrown},
                                        sizes: [],
                                        has_v360: true,
                                        has_image: true,
                                        color: [],
                                        girdle: [],
                                        flouresence: [],
                                        delivery_time: [],
                                        certificate_lab: [],
                                        polish: [],
                                        symmetry: [],
                                        dollar_value: { from: 0, to: 10000000},
                                        dollar_per_carat: null,
                                    },
                                    offset: 0,
                                    limit: 50,
                                    order: { type: price, direction: ${
                                      sortOrder === "ASC" ? "ASC" : "DESC"
                                    } }
                                ) {
                                    items {
                                        id
                                        video
                                        image
                                        availability
                                        supplierStockId
                                        brown
                                        green
                                        milky
                                        eyeClean
                                        blue
                                        gray
                                        other
                                        eyeClean
                                        supplier{
                                          id
                                          name
                                          locations{
                                            country
                                            city
                                            state
                                          }
                                        }
                                        delivery_time{
                                          express_timeline_applicable
                                          min_business_days
                                          max_business_days
                                        }
                                        mine_of_origin
                                        certificate {
                                          id
                                          lab
                                          shape
                                          certNumber
                                          cut
                                          carats
                                          clarity
                                          polish
                                          symmetry
                                          color
                                          width
                                          length
                                          depth
                                          girdle
                                          floInt
                                          floCol
                                          depthPercentage
                                          table
                                         }
                                    price
                                    }
                                    total_count
                                }
                            }
                        `,
            }),
          }
        );

        const diamondsData = await diamondsResponse.json();

        if (diamondsData.error) {
          setLoading(false);
          console.error("Nivoda Diamonds Query Error:", diamondsData.error);
        } else {
          // Set diamondsData in state or perform other actions as needed
          setDiamondsData(diamondsData.data.diamonds_by_query.items);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching Nivoda data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [labGrown, sortOrder]);

  return (
    <NivodaDiamondsContext.Provider
      value={{
        diamondsData,
        filteredDiamonds,
        setFilteredDiamonds,
        clearFilter,
        setClearFilter,
        labGrown,
        setLabGrown,
        loading,
        sortOrder,
        setSortOrder,
      }}
    >
      {children}
    </NivodaDiamondsContext.Provider>
  );
};

export const useNivodaDiamonds = () => {
  return useContext(NivodaDiamondsContext);
};
