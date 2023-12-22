import React, { useEffect, useState } from "react";
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

const SortSubmenu = ({ onSortSelected }) => {
  const handleSortClick = (order) => {
    onSortSelected(order);
  };

  return (
    <div className="origin-top-right absolute z-20 right-0 mt-10 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-100">
      <div
        className="py-1"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="menu-button"
      >
        <a
          href="#"
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
          role="menuitem"
          onClick={() => handleSortClick("ASC")}
        >
          Price: Low to High
        </a>
        <a
          href="#"
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
          role="menuitem"
          onClick={() => handleSortClick("DESC")}
        >
          Price: High to Low
        </a>
      </div>
    </div>
  );
};

export const Filter = () => {
  const {
    setFilteredDiamonds,
    setClearFilter,
    labGrown,
    setLabGrown,
    sortOrder,
    setSortOrder,
  } = useNivodaDiamonds();
  const [loading, setLoading] = useState(false);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedDeliveryTimes, setSelectedDeliveryTimes] = useState([]);
  const [selectedCertificates, setSelectedCertificates] = useState([]);
  const [selectedShapes, setSelectedShapes] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedClarity, setSelectedClarity] = useState([]);
  const [selectedCuts, setSelectedCuts] = useState([]);
  const [selectedPolishes, setSelectedPolishes] = useState([]);
  const [selectedSymmetries, setSelectedSymmetries] = useState([]);
  const [selectedFlourescence, setSelectedFlourescence] = useState([]);
  const [anyFilterApplied, setAnyFilterApplied] = useState(false);
  const [isNaturalSelected, setIsNaturalSelected] = useState(true);
  const [dollarFrom, setDollarFrom] = useState(0);
  const [dollarTo, setDollarTo] = useState(10000000);

  const onCutSelect = (cut) => {
    setSelectedCuts((prevSelected) =>
      prevSelected.includes(cut)
        ? prevSelected.filter((selectedCut) => selectedCut !== cut)
        : [...prevSelected, cut]
    );
  };

  const onPolishSelect = (polish) => {
    setSelectedPolishes((prevSelected) =>
      prevSelected.includes(polish)
        ? prevSelected.filter((selectedPolish) => selectedPolish !== polish)
        : [...prevSelected, polish]
    );
  };

  const onSymmetrySelect = (symmetry) => {
    setSelectedSymmetries((prevSelected) =>
      prevSelected.includes(symmetry)
        ? prevSelected.filter(
            (selectedSymmetry) => selectedSymmetry !== symmetry
          )
        : [...prevSelected, symmetry]
    );
  };

  const onColorSelect = (color) => {
    setSelectedColors((prevSelected) =>
      prevSelected.includes(color)
        ? prevSelected.filter((selectedColor) => selectedColor !== color)
        : [...prevSelected, color]
    );
  };

  const onClaritySelect = (clarity) => {
    setSelectedClarity((prevSelected) =>
      prevSelected.includes(clarity)
        ? prevSelected.filter((selectedClarity) => selectedClarity !== clarity)
        : [...prevSelected, clarity]
    );
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    // Disable/enable scroll on body
    document.body.style.overflow = isSidebarOpen ? "auto" : "hidden";
  };

  const handleDeliveryTimeSelection = (time) => {
    setSelectedDeliveryTimes((prevSelected) =>
      prevSelected.includes(time)
        ? prevSelected.filter((selectedTime) => selectedTime !== time)
        : [...prevSelected, time]
    );
  };

  const handleCertificateSelection = (certificate) => {
    setSelectedCertificates((prevSelected) =>
      prevSelected.includes(certificate)
        ? prevSelected.filter(
            (selectedCertificate) => selectedCertificate !== certificate
          )
        : [...prevSelected, certificate]
    );
  };

  const onShapeSelect = (shape) => {
    setSelectedShapes((prevSelected) =>
      prevSelected.includes(shape)
        ? prevSelected.filter((selectedShape) => selectedShape !== shape)
        : [...prevSelected, shape]
    );
  };
  const onFluorescenceSelect = (fluorescence) => {
    setSelectedFlourescence((prevSelected) =>
      prevSelected.includes(fluorescence)
        ? prevSelected.filter(
            (selectedFlourescence) => selectedFlourescence !== fluorescence
          )
        : [...prevSelected, fluorescence]
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
                                        sizes: [],
                                        has_v360: true,
                                        has_image: true,
                                        color: ${
                                          selectedColors.length > 0
                                            ? `[${selectedColors
                                                .map((cl) => `${cl}`)
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
        console.error("Nivoda Diamonds Query Error:", diamondsData.error);
        setLoading(false);
      } else {
        setFilteredDiamonds(diamondsData.data.diamonds_by_query.items);
        setLoading(false);
        setAnyFilterApplied(true);
        toggleSidebar();
      }
    } catch (error) {
      console.error("Error fetching Nivoda data:", error);
      setLoading(false);
    }
  };

  const [showSort, setShowSort] = useState(false);

  const onClearFilters = () => {
    setSelectedCertificates([]);
    setSelectedDeliveryTimes([]);
    setSelectedShapes([]);
    setSelectedColors([]);
    setSelectedClarity([]);
    setSelectedCuts([]);
    setSelectedPolishes([]);
    setSelectedSymmetries([]);
    setSelectedFlourescence([]);
    setAnyFilterApplied(false);
    toggleSidebar();
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
            className="group w-24 relative px-4 py-3 rounded-md text-sm font-medium bg-gray-900 text-white hover:bg-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
            style={{
              backgroundColor: "rgb(45, 60, 92)",
            }}
            onClick={toggleSidebar}
          >
            All filters
            {anyFilterApplied && (
              <span className="absolute top-0 right-0 w-3 h-3 bg-pink-500 rounded-full"></span>
            )}
          </button>

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

          <SideBar
            isOpen={isSidebarOpen}
            onClose={toggleSidebar}
            selectedDeliveryTimes={selectedDeliveryTimes}
            selectedCertificates={selectedCertificates}
            onDeliveryTimeSelect={handleDeliveryTimeSelection}
            onCertificateSelect={handleCertificateSelection}
            selectedShapes={selectedShapes}
            onShapeSelect={onShapeSelect}
            onColorSelect={onColorSelect}
            selectedColors={selectedColors}
            onClaritySelect={onClaritySelect}
            selectedClarity={selectedClarity}
            selectedCuts={selectedCuts}
            onCutSelect={onCutSelect}
            selectedPolishes={selectedPolishes}
            onPolishSelect={onPolishSelect}
            selectedSymmetries={selectedSymmetries}
            onSymmetrySelect={onSymmetrySelect}
            handleFiltersApplied={handleFiltersApplied}
            onClearFilters={onClearFilters}
            selectedFlourescence={selectedFlourescence}
            onFluorescenceSelect={onFluorescenceSelect}
            loading={loading}
            dollarFrom={dollarFrom}
            setDollarFrom={setDollarFrom}
            dollarTo={dollarTo}
            setDollarTo={setDollarTo}
          />
        </div>
      </div>
    </section>
  );
};

const SideBar = ({
  isOpen,
  onClose,
  selectedDeliveryTimes,
  selectedCertificates,
  selectedShapes,
  onDeliveryTimeSelect,
  onCertificateSelect,
  onShapeSelect,
  onColorSelect,
  selectedColors,
  onClaritySelect,
  selectedClarity,
  selectedCuts,
  onCutSelect,
  selectedPolishes,
  onPolishSelect,
  selectedSymmetries,
  onSymmetrySelect,
  handleFiltersApplied,
  onClearFilters,
  onFluorescenceSelect,
  selectedFlourescence,
  loading,
  dollarFrom,
  setDollarFrom,
  dollarTo,
  setDollarTo,
}) => {
  console.log(dollarTo);
  console.log(dollarFrom);
  return (
    <div
      className={`fixed top-0 left-0 w-[720px] h-full bg-white shadow-lg transform ${
        isOpen
          ? "translate-x-0 opacity-100 z-50"
          : "-translate-x-full opacity-0"
      } transition-transform transition-opacity ease-in-out duration-300 overflow-y-auto`}
    >
      <div className="flex  justify-between items-between p-4 bg-gray-900 text-white">
        <span className="text-white">Filters</span>
        <button onClick={onClose} className="focus:outline-none text-left">
          Close
        </button>
      </div>

      <div className="flex flex-col flex-grow p-4">
        <div className="grid grid-cols-2 gap-2">
          {/* Delivery Time */}
          <div>
            <h2 className="text-lg font-bold mb-2">Delivery Time</h2>
            {deliveryData.map((option) => (
              <button
                key={option.id}
                onClick={() => onDeliveryTimeSelect(option.time)}
                className={`${
                  selectedDeliveryTimes.includes(option.time)
                    ? "border-pink-500 text-pink-500"
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
                    ? "border-pink-500 text-pink-500"
                    : "text-black bg-white border-gray-300"
                } px-4 py-2 m-1 rounded-md border focus:outline-none`}
              >
                {option.name}
              </button>
            ))}
          </div>

          {/* Shapes */}
          <div className="col-span-2 mt-4">
            <h2 className="text-lg font-bold mb-2">Shapes</h2>
            <div className="grid grid-cols-6 gap-4">
              {shapeData.map((shape) => (
                <button
                  key={shape.id}
                  onClick={() => onShapeSelect(shape.name)}
                  className={`${
                    selectedShapes.includes(shape.name)
                      ? "border-pink-500 text-pink-500"
                      : "text-black bg-white border-gray-300"
                  } px-4 py-2 rounded-md border focus:outline-none flex flex-col items-center justify-center`}
                >
                  {shape.img}
                  {shape.name}
                </button>
              ))}
            </div>
          </div>

          {/* Colour */}
          <div>
            <h2 className="text-lg font-bold mb-2">Colour</h2>
            {colorData.map((option) => (
              <button
                key={option.id}
                onClick={() => onColorSelect(option.color)}
                className={`${
                  selectedColors.includes(option.color)
                    ? "border-pink-500 text-pink-500"
                    : "text-black bg-white border-gray-300"
                } px-4 py-2 rounded-md border focus:outline-none`}
                style={{
                  margin: "2px",
                }}
              >
                {option.color}
              </button>
            ))}
          </div>

          {/* Clarity */}
          <div>
            <h2 className="text-lg font-bold mb-2">Clarity</h2>
            {clarityData.map((option) => (
              <button
                key={option.id}
                onClick={() => onClaritySelect(option.id)}
                className={`${
                  selectedClarity.includes(option.id)
                    ? "border-pink-500 text-pink-500"
                    : "text-black bg-white border-gray-300"
                } px-4 py-2 m-1 rounded-md border focus:outline-none`}
              >
                {option.clarity}
              </button>
            ))}
          </div>

          {/* Cut */}
          <div>
            <h2 className="text-lg font-bold mb-2">Cut</h2>
            {cutData.map((option) => (
              <button
                key={option.id}
                onClick={() => onCutSelect(option.cut)}
                className={`${
                  selectedCuts.includes(option.cut)
                    ? "border-pink-500 text-pink-500"
                    : "text-black bg-white border-gray-300"
                } px-4 py-2 m-1 rounded-md border focus:outline-none`}
              >
                {option.description}
              </button>
            ))}
          </div>

          {/* Polish */}
          <div>
            <h2 className="text-lg font-bold mb-2">Polish</h2>
            {polishData.map((option) => (
              <button
                key={option.id}
                onClick={() => onPolishSelect(option.polish)}
                className={`${
                  selectedPolishes.includes(option.polish)
                    ? "border-pink-500 text-pink-500"
                    : "text-black bg-white border-gray-300"
                } px-4 py-2 m-1 rounded-md border focus:outline-none`}
              >
                {option.description}
              </button>
            ))}
          </div>

          {/* Symmetry */}
          <div>
            <h2 className="text-lg font-bold mb-2">Symmetry</h2>
            {symmetryData.map((option) => (
              <button
                key={option.id}
                onClick={() => onSymmetrySelect(option.symmetry)}
                className={`${
                  selectedSymmetries.includes(option.symmetry)
                    ? "border-pink-500 text-pink-500"
                    : "text-black bg-white border-gray-300"
                } px-4 py-2 m-1 rounded-md border focus:outline-none`}
              >
                {option.description}
              </button>
            ))}
          </div>

          {/* Fluorescence */}
          <div className="col-span-2 mt-4 mb-4">
            <h2 className="text-lg font-bold mb-2">Fluorescence</h2>
            <div className="grid grid-cols-6 gap-4">
              {fluorescenceData.map((option) => (
                <button
                  key={option.id}
                  onClick={() => onFluorescenceSelect(option.id)}
                  className={`${
                    selectedFlourescence.includes(option.id)
                      ? "border-pink-500 text-pink-500"
                      : "text-black bg-white border-gray-300"
                  } px-4 py-1 rounded-md border focus:outline-none text-center`}
                >
                  {option.fluorescence}
                </button>
              ))}
            </div>
          </div>

          {/* Price */}

          <div className="col-span-2 mt-4 mb-4">
            <h2 className="text-lg font-bold mb-2">Price</h2>
            <div className="grid grid-cols-8 gap-1">
              <div className="col-span-1">
                <button className="border-pink-400 border-2 text-pink-500 px-4 mt-6 py-2 rounded-md focus:outline-none">
                  <span className="text-pink-500 text-center">Price</span>
                </button>
              </div>
              <div className="col-span-3">
                <label htmlFor="">
                  <span className="text-gray-600 text-center">Min</span>
                </label>

                <input
                  type="number"
                  placeholder="Min: (eg: 0)"
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none"
                  onChange={(e) => setDollarFrom(e.target.value)}
                />
              </div>
              <div className="col-span-3">
                <label htmlFor="">
                  <span className="text-gray-600">Max</span>
                </label>
                <input
                  type="number"
                  placeholder="Max: (eg: 100000)"
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none"
                  onChange={(e) => setDollarTo(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className=" sticky bottom-0 left-0 right-0 border-t-2 pt-3 bg-gray-50 text-white flex justify-evenly items-center py-2">
        <button
          onClick={onClearFilters}
          className="w-20 mr-4 h-full text-black"
        >
          Clear
        </button>
        <button
          onClick={onClearFilters}
          className="w-20 mr-4 h-full text-black"
        >
          Cancel
        </button>
        <button
          onClick={handleFiltersApplied}
          className="bg-gray-900 w-full p-2 h-full rounded focus:outline-none"
          disabled={loading}
        >
          {loading ? "Fetching Diamonds..." : "Apply Filters"}
        </button>
      </div>
    </div>
  );
};
