import { useEffect, useState } from "react";
import {
  certificateLabData,
  clarityData,
  colorData,
  cutData,
  deliveryData,
  fluorescenceData,
  polishData,
  shapeData,
  symmetryData,
} from "./libs/data";
import { useNivodaDiamonds } from "../context/ApiContext";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
export const Filter = () => {
  const {
    setFilteredDiamonds,
    setClearFilter,
    labGrown,
    setLabGrown,
    sortOrder,
    setSortOrder,
    loading,
    setLoading,
  } = useNivodaDiamonds();
  const defaultValues = {
    selectedShapes: ["ROUND"],
    selectedColors: ["H", "G", "F", "E", "D"],
    selectedClarity: ["SI1", "VS2", "VS1", "VVS2", "VVS1", "IF"],
    selectedCuts: ["GD", "G", "EX"],
    dollarFrom: 500,
    dollarTo: 10000000,
    diamondSizeFrom: 0.92,
    diamondSizeTo: 30.0,
    selectedSymmetries: ["EX", "VG", "GD"],
    selectedPolishes: ["EX", "VG", "G"],
    selectedFluorescence: ["NON", "FNT", "MED", "STG", "VST"],
  };

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedDeliveryTimes, setSelectedDeliveryTimes] = useState([]);
  const [selectedCertificates, setSelectedCertificates] = useState([]);
  const [selectedShapes, setSelectedShapes] = useState(
    defaultValues.selectedShapes
  );
  const [selectedColors, setSelectedColors] = useState(
    defaultValues.selectedColors
  );
  const [selectedClarity, setSelectedClarity] = useState(
    defaultValues.selectedClarity
  );
  const [selectedCuts, setSelectedCuts] = useState(defaultValues.selectedCuts);
  const [selectedPolishes, setSelectedPolishes] = useState(
    defaultValues.selectedPolishes
  );
  const [selectedSymmetries, setSelectedSymmetries] = useState(
    defaultValues.selectedSymmetries
  );
  const [selectedFlourescence, setSelectedFlourescence] = useState(
    defaultValues.selectedFluorescence
  );
  const [anyFilterApplied, setAnyFilterApplied] = useState(false);
  const [dollarFrom, setDollarFrom] = useState(defaultValues.dollarFrom);
  const [dollarTo, setDollarTo] = useState(defaultValues.dollarTo);
  const [diamondSizeFrom, setDiamondSizeFrom] = useState(
    defaultValues.diamondSizeFrom
  );
  const [diamondSizeTo, setDiamondSizeTo] = useState(
    defaultValues.diamondSizeTo
  );

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    // Disable/enable scroll on body
    document.body.style.overflow = isSidebarOpen ? "auto" : "hidden";
  };

  const onShapeSelect = (shape) => {
    setSelectedShapes((prevSelected) =>
      prevSelected.includes(shape)
        ? prevSelected.filter((selectedShape) => selectedShape !== shape)
        : [...prevSelected, shape]
    );
  };

  const onDeliveryTimeSelect = (time) => {
    setSelectedDeliveryTimes((prevSelected) =>
      prevSelected.includes(time)
        ? prevSelected.filter((selectedTime) => selectedTime !== time)
        : [...prevSelected, time]
    );
  };

  const onCertificateSelect = (certificate) => {
    setSelectedCertificates((prevSelected) =>
      prevSelected.includes(certificate)
        ? prevSelected.filter(
            (selectedCertificate) => selectedCertificate !== certificate
          )
        : [...prevSelected, certificate]
    );
  };

  const handleFiltersApplied = async () => {
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
                                        shapes: ${
                                          selectedShapes.length > 0
                                            ? `[${selectedShapes.map(
                                                (shape) => `"${shape}"`
                                              )}]`
                                            : "[]"
                                        },
                                        cut: ${
                                          selectedCuts.length > 0
                                            ? `[${selectedCuts
                                                .map((cut) => `${cut}`)
                                                .join(", ")}]`
                                            : "[]"
                                        },
                                        sizes: [{ from: ${diamondSizeFrom}, to: ${diamondSizeTo}}],
                                        has_v360: true,
                                        has_image: true,
                                        color: ${
                                          selectedColors.length > 0
                                            ? `[${selectedColors
                                                .map((cl) => `${cl}`)
                                                .join(", ")}]`
                                            : "[]"
                                        },
                                        clarity: ${
                                          selectedClarity.length > 0
                                            ? `[${selectedClarity
                                                .map((clarity) => `${clarity}`)
                                                .join(", ")}]`
                                            : "[]"
                                        },
                                        girdle: [],
                                        flouresence: ${
                                          selectedFlourescence.length > 0
                                            ? `[${selectedFlourescence
                                                .map((fl) => `${fl}`)
                                                .join(", ")}]`
                                            : "[]"
                                        },
                                        delivery_time: ${
                                          selectedDeliveryTimes.length > 0
                                            ? `[${selectedDeliveryTimes
                                                .map((time) => `${time}`)
                                                .join(", ")}]`
                                            : "[]"
                                        },
                                        certificate_lab: ${
                                          selectedCertificates.length > 0
                                            ? `[${selectedCertificates
                                                .map(
                                                  (certificate) =>
                                                    `${certificate}`
                                                )
                                                .join(", ")}]`
                                            : "[]"
                                        },
                                        polish: ${
                                          selectedPolishes.length > 0
                                            ? `[${selectedPolishes
                                                .map((polish) => `${polish}`)
                                                .join(", ")}]`
                                            : "[]"
                                        },
                                        
                                        symmetry: ${
                                          selectedSymmetries.length > 0
                                            ? `[${selectedSymmetries
                                                .map(
                                                  (symmetry) => `${symmetry}`
                                                )
                                                .join(", ")}]`
                                            : "[]"
                                        },
                                        dollar_value: { from: ${dollarFrom}, to: ${dollarTo}},
                                        dollar_per_carat: null,
                                        returns: true,
                                    },
                                    offset: 0,
                                    limit: 50,
                                    order: { type: price, direction: ${
                                      sortOrder === "ASC" ? "ASC" : "DESC"
                                    } },
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
        console.error("Nivoda Diamonds Query Error:", diamondsData.error);
        setLoading(false);
      } else {
        const filterImage = diamondsData.data.diamonds_by_query.items.filter(
          (item) => item.image !== null
        );
        setFilteredDiamonds(filterImage);
        setLoading(false);
        if (
          selectedClarity ||
          selectedColors ||
          selectedCuts ||
          selectedPolishes ||
          selectedSymmetries ||
          selectedFlourescence ||
          selectedDeliveryTimes ||
          selectedCertificates ||
          selectedShapes ||
          dollarFrom ||
          dollarTo ||
          diamondSizeFrom ||
          diamondSizeTo
        ) {
          setAnyFilterApplied(true);
        }
      }
    } catch (error) {
      console.error("Error fetching Nivoda data:", error);
      setLoading(false);
    }
  };

  const [showSort, setShowSort] = useState(false);
  const [showMore, setShowMore] = useState(false);

  const onClearFilters = () => {
    setSelectedCertificates([]);
    setSelectedDeliveryTimes([]);
    setSelectedShapes(defaultValues.selectedShapes);
    setSelectedColors(defaultValues.selectedColors);
    setSelectedClarity(defaultValues.selectedClarity);
    setSelectedCuts(defaultValues.selectedCuts);
    setSelectedPolishes([]);
    setSelectedSymmetries([]);
    setSelectedFlourescence([]);
    setAnyFilterApplied(false);
    setDollarFrom(defaultValues.dollarFrom);
    setDollarTo(defaultValues.dollarTo);
    setDiamondSizeFrom(defaultValues.diamondSizeFrom);
    setDiamondSizeTo(defaultValues.diamondSizeTo);
    setSelectedCuts;
    setLabGrown(false);
    setClearFilter(true);
  };

  const toggleSort = () => {
    setShowSort(!showSort);
  };

  return (
    <section className="text-gray-400 body-font  bg-slate-100">
      <div className="container px-5 py-2 mx-auto">
        <div className="group relative inline-flex text-left justify-between w-full items-start">
          <button
            type="button"
            className="ml-2 px-4 py-3 rounded-md text-sm font-medium bg-gray-900 text-white hover:bg-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
            style={{
              backgroundColor: "rgb(45, 60, 92)",
            }}
            onClick={() => toggleSort()}
          >
            Sort :{" "}
            {sortOrder === "ASC" ? "Price: Low to High" : "Price: High to Low"}
          </button>

          {showSort === true && (
            <div className="origin-top-right absolute z-20 right-0 mt-10 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-100">
              <div
                className="py-1"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="menu-button"
              >
                <button
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  role="menuitem"
                  onClick={() => setSortOrder("ASC")}
                >
                  Price: Low to High
                </button>
                <button
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  role="menuitem"
                  onClick={() => setSortOrder("DESC")}
                >
                  Price: High to Low
                </button>
              </div>
            </div>
          )}

          {isSidebarOpen && (
            <div
              className="fixed inset-0 bg-black opacity-50 z-10"
              onClick={toggleSidebar}
            />
          )}
        </div>
        <div className="w-[900px] mx-auto z-50">
          <div className="flex flex-col flex-grow ">
            <div className="grid grid-cols-2 sm:grid-cols-2 gap-4 py-4">
              {/* Delivery Time */}
              <div>
                <h2 className="text-lg font-bold mb-2">Delivery Time</h2>
                {deliveryData.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => onDeliveryTimeSelect(option.time)}
                    className={`${
                      selectedDeliveryTimes.includes(option.time)
                        ? "border-blue-400 text-black"
                        : "text-black bg-white border-gray-300"
                    } px-4 py-2 m-1 rounded-md border focus:outline-none`}
                  >
                    {option.name}
                  </button>
                ))}
              </div>

              {/* Certificate Lab */}
              <div>
                <h2 className="text-lg font-bold mb-2">Certificate Lab</h2>
                {certificateLabData.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => onCertificateSelect(option.name)}
                    className={`${
                      selectedCertificates.includes(option.name)
                        ? "border-blue-400 text-black"
                        : "text-black bg-white border-gray-300"
                    } px-4 py-2 m-1 rounded-md border focus:outline-none`}
                  >
                    {option.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Colour */}

            <div className="grid grid-cols-2 sm:grid-cols-2 gap-[100px] ">
              <div>
                <h2 className="text-lg font-bold mb-2">Colour</h2>
                <Slider
                  range
                  marks={
                    colorData.length > 0
                      ? colorData.reduce((acc, item, index) => {
                          acc[index + 1] = {
                            label: item.color,
                          };
                          return acc;
                        }, {})
                      : {}
                  }
                  min={1}
                  max={colorData.length}
                  step={1}
                  defaultValue={
                    selectedColors.length > 0
                      ? [
                          colorData.findIndex(
                            (item) => item.color === selectedColors[0]
                          ) + 1,
                          colorData.findIndex(
                            (item) =>
                              item.color ===
                              selectedColors[selectedColors.length - 1]
                          ) + 1,
                        ]
                      : [1, colorData.length]
                  }
                  onChange={(values) => {
                    const selectedColorIds = Array.from(
                      { length: values[1] - values[0] + 1 },
                      (_, index) => values[0] + index
                    );
                    setSelectedColors(
                      selectedColorIds.map(
                        (id) =>
                          colorData.find((color) => color.id === id)?.color
                      )
                    );
                  }}
                  trackStyle={{
                    backgroundColor: "#000000",
                  }}
                  handleStyle={{
                    backgroundColor: "#fff",
                    borderColor: "#000000",
                    width: "20px",
                    height: "20px",
                    marginTop: "-7px",
                  }}
                  railStyle={{
                    backgroundColor: "#d5d5d5",
                  }}
                />
              </div>
              {/* Clarity */}
              <div>
                <h2 className="text-lg font-bold mb-2">Clarity</h2>
                <Slider
                  range
                  marks={
                    clarityData.length > 0
                      ? clarityData.reduce((acc, item, index) => {
                          acc[index + 1] = {
                            label: item.clarity,
                          };
                          return acc;
                        }, {})
                      : {}
                  }
                  min={1}
                  max={clarityData.length}
                  step={1}
                  defaultValue={
                    selectedClarity.length > 0
                      ? [
                          clarityData.findIndex(
                            (item) => item.clarity === selectedClarity[0]
                          ) + 1,
                          clarityData.findIndex(
                            (item) =>
                              item.clarity ===
                              selectedClarity[selectedClarity.length - 1]
                          ) + 1,
                        ]
                      : [1, clarityData.length]
                  }
                  onChange={(values) => {
                    const selectedClarityIds = Array.from(
                      { length: values[1] - values[0] + 1 },
                      (_, index) => values[0] + index
                    );
                    setSelectedClarity(
                      selectedClarityIds.map(
                        (id) =>
                          clarityData.find((clarity) => clarity.id === id)
                            ?.clarity
                      )
                    );
                  }}
                  trackStyle={[
                    {
                      backgroundColor: "#000000",
                    },
                  ]}
                  handleStyle={{
                    backgroundColor: "#fff",
                    borderColor: "#000000",
                    width: "20px",
                    height: "20px",
                    marginTop: "-7px",
                  }}
                  railStyle={{
                    backgroundColor: "#d5d5d5",
                  }}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-2 gap-[100px] py-10">
              <div>
                <h2 className="text-lg font-bold mb-2">Cut</h2>
                <Slider
                  range
                  marks={
                    cutData.length > 0
                      ? cutData.reduce((acc, item, index) => {
                          acc[index + 1] = {
                            label: item.description,
                          };
                          return acc;
                        }, {})
                      : {}
                  }
                  min={1}
                  max={cutData.length}
                  step={1}
                  defaultValue={
                    selectedCuts.length > 0
                      ? [
                          cutData.findIndex(
                            (item) => item.cut === selectedCuts[0]
                          ) + 1,
                          cutData.findIndex(
                            (item) =>
                              item.cut === selectedCuts[selectedCuts.length - 1]
                          ) + 1,
                        ]
                      : [1, cutData.length]
                  }
                  onChange={(values) => {
                    const selectedCutIndices = Array.from(
                      { length: values[1] - values[0] + 1 },
                      (_, index) => values[0] + index
                    );
                    setSelectedCuts(
                      selectedCutIndices.map((index) => cutData[index - 1]?.cut)
                    );
                  }}
                  trackStyle={{
                    backgroundColor: "#000000",
                  }}
                  handleStyle={{
                    backgroundColor: "#fff",
                    borderColor: "#000000",
                    width: "20px",
                    height: "20px",
                    marginTop: "-7px",
                  }}
                  railStyle={{
                    backgroundColor: "#d5d5d5",
                  }}
                />
              </div>

              <div>
                <h2 className="text-lg font-bold mb-2">Shape</h2>
                <div className="flex">
                  {shapeData.map((shape) => (
                    <button
                      key={shape.id}
                      onClick={() => onShapeSelect(shape.name)}
                      className={`${
                        selectedShapes.includes(shape.name)
                          ? "border-blue-400 text-black bg-white"
                          : "text-black bg-white border-gray-300"
                      } px-6 py-2 rounded-sm border focus:outline-none flex flex-col w-[20px] mr-2  items-center justify-center`}
                    >
                      {shape.img}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-lg font-bold mb-2 text-black">
                Advanced Filters
              </h2>
              <button
                onClick={
                  showMore === true
                    ? () => setShowMore(false)
                    : () => setShowMore(true)
                }
                className="border-blue-400 border-2 text-black px-4 mt-6 py-2 rounded-md focus:outline-none bg-white"
              >
                {showMore ? "Hide Advanced Filters" : "Show Advanced Filters"}
              </button>
            </div>

            {showMore === true ? (
              <div className="grid grid-cols-2 gap-[120px]">
                <div
                  className="
          "
                >
                  <h2 className="text-lg font-bold mb-2">Polish</h2>
                  <Slider
                    range
                    marks={
                      polishData.length > 0
                        ? polishData.reduce((acc, item, index) => {
                            acc[index + 1] = {
                              label: item.description,
                            };
                            return acc;
                          }, {})
                        : {}
                    }
                    min={1}
                    max={polishData.length}
                    step={1}
                    defaultValue={
                      selectedPolishes.length > 0
                        ? [
                            polishData.findIndex(
                              (item) => item.polish === selectedPolishes[0]
                            ) + 1,
                            polishData.findIndex(
                              (item) =>
                                item.polish ===
                                selectedPolishes[selectedPolishes.length - 1]
                            ) + 1,
                          ]
                        : [1, polishData.length]
                    }
                    onChange={(values) => {
                      const selectedPolishIndices = Array.from(
                        { length: values[1] - values[0] + 1 },
                        (_, index) => values[0] + index
                      );
                      setSelectedPolishes(
                        selectedPolishIndices.map(
                          (index) =>
                            polishData.find((item) => item.id === index)?.polish
                        )
                      );
                    }}
                    trackStyle={{
                      backgroundColor: "#000",
                    }}
                    handleStyle={{
                      backgroundColor: "#fff",
                      borderColor: "#000",
                      width: "20px",
                      height: "20px",
                      marginTop: "-7px",
                    }}
                    railStyle={{
                      backgroundColor: "#d5d5d5",
                    }}
                  />
                </div>

                <div className="">
                  <h2 className="text-lg font-bold mb-2">Symmetry</h2>
                  <Slider
                    range
                    marks={
                      symmetryData.length > 0
                        ? symmetryData.reduce((acc, item, index) => {
                            acc[index + 1] = {
                              label: item.description,
                            };
                            return acc;
                          }, {})
                        : {}
                    }
                    min={1}
                    max={symmetryData.length}
                    step={1}
                    defaultValue={
                      selectedSymmetries.length > 0
                        ? [
                            symmetryData.findIndex(
                              (item) => item.symmetry === selectedSymmetries[0]
                            ) + 1,
                            symmetryData.findIndex(
                              (item) =>
                                item.symmetry ===
                                selectedSymmetries[
                                  selectedSymmetries.length - 1
                                ]
                            ) + 1,
                          ]
                        : [1, symmetryData.length]
                    }
                    onChange={(values) => {
                      const selectedSymmetryIndices = Array.from(
                        { length: values[1] - values[0] + 1 },
                        (_, index) => values[0] + index
                      );
                      setSelectedSymmetries(
                        selectedSymmetryIndices.map(
                          (index) =>
                            symmetryData.find((item) => item.id === index)
                              ?.symmetry
                        )
                      );
                    }}
                    trackStyle={{
                      backgroundColor: "#000",
                    }}
                    handleStyle={{
                      backgroundColor: "#fff",
                      borderColor: "#000",
                      width: "20px",
                      height: "20px",
                      marginTop: "-7px",
                    }}
                    railStyle={{
                      backgroundColor: "#d5d5d5",
                    }}
                  />
                </div>
              </div>
            ) : null}
          </div>

          <div className="grid grid-cols-2 gap-[100px] pt-10">
            <div className="mt-4 mb-4">
              <h2 className="text-lg font-bold mb-2">Price</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-1 gap-4">
                <div>
                  <label htmlFor="">
                    <span className="text-gray-600 text-center mr-1">
                      Min $
                    </span>
                  </label>
                  <input
                    type="number"
                    placeholder="Min: (eg: 0)"
                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none text-black"
                    onChange={(e) => setDollarFrom(e.target.value)}
                    value={dollarFrom}
                  />
                </div>
                <div>
                  <label htmlFor="">
                    <span className="text-gray-600 mr-1">Max $</span>
                  </label>
                  <input
                    type="number"
                    placeholder="Max: (eg: 100000)"
                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none text-black mt-2 md:mt-0"
                    onChange={(e) => setDollarTo(e.target.value)}
                    value={dollarTo}
                  />
                </div>
              </div>
            </div>

            {/* Diamond Size */}
            <div className="mt-4 mb-4">
              <h2 className="text-lg font-bold mb-2">Carats (ct)</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="">
                    <span className="text-gray-600 text-center mr-2">Min</span>
                  </label>
                  <input
                    type="number"
                    step="any"
                    placeholder="0 ct  use . for decimals (eg: 0.5)"
                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none"
                    onChange={(e) => setDiamondSizeFrom(e.target.value)}
                    value={diamondSizeFrom}
                  />
                </div>
                <div>
                  <label htmlFor="">
                    <span className="text-gray-600 mr-1">Max</span>
                  </label>
                  <input
                    type="number"
                    step="any"
                    placeholder="0 ct  use . for decimals (eg: 0.5)"
                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none mt-2 md:mt-0"
                    onChange={(e) => setDiamondSizeTo(e.target.value)}
                    value={diamondSizeTo}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="border-t-2 pt-3 bg-gray-50 text-white flex  justify-center items-center py-2">
            <button
              onClick={onClearFilters}
              className="w-20 mb-2 h-full text-black"
            >
              Clear
            </button>
            <button
              onClick={onClearFilters}
              className="w-20 mb-2 h-full text-black"
            >
              Cancel
            </button>
            <button
              onClick={handleFiltersApplied}
              className="bg-gray-900 w-full p-2 h-full rounded focus:outline-none mb-2"
              disabled={loading}
            >
              {loading ? "Fetching Diamonds..." : "Apply Filters"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
