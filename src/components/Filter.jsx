import React, { useState } from "react";
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

const SortSubmenu = () => {
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
        >
          Price: Low to High
        </a>
        <a
          href="#"
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
          role="menuitem"
        >
          Price: High to Low
        </a>
      </div>
    </div>
  );
};

export const Filter = () => {
  const [isSortHovered, setIsSortHovered] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedDeliveryTimes, setSelectedDeliveryTimes] = useState([]);
  const [selectedCertificates, setSelectedCertificates] = useState([]);
  const [selectedShapes, setSelectedShapes] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedClarity, setSelectedClarity] = useState([]);
  const [selectedCuts, setSelectedCuts] = useState([]);
  const [selectedPolishes, setSelectedPolishes] = useState([]);
  const [selectedSymmetries, setSelectedSymmetries] = useState([]);

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

  const handleSortHover = () => {
    setIsSortHovered(true);
  };

  const handleSortLeave = () => {
    setIsSortHovered(false);
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

  const onApplyFilters = () => {
    console.log(
      selectedCertificates,
      selectedDeliveryTimes,
      selectedShapes,
      selectedColors,
      selectedClarity,
      selectedCuts,
      selectedPolishes,
      selectedSymmetries
    );
    setIsSidebarOpen(false);
  };

  return (
    <section className="text-gray-400 body-font bg-slate-100">
      <div className="container px-5 py-2 mx-auto">
        <div className="group relative inline-flex text-left justify-between w-full items-start">
          <button
            type="button"
            className="group w-24 px-4 py-3 rounded-md text-sm font-medium bg-gray-900 text-white hover:bg-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
            style={{
              backgroundColor: "rgb(45, 60, 92)",
            }}
            onClick={toggleSidebar}
          >
            All filters
          </button>

          <button
            type="button"
            className="ml-2 px-4 py-3 rounded-md text-sm font-medium bg-gray-900 text-white hover:bg-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
            style={{
              backgroundColor: "rgb(45, 60, 92)",
            }}
            onMouseEnter={handleSortHover}
            onMouseLeave={handleSortLeave}
          >
            Sort
          </button>

          {isSortHovered && <SortSubmenu />}

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
            onApplyFilters={onApplyFilters}
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
  onApplyFilters,
}) => {
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
                onClick={() => onCertificateSelect(option.id)}
                className={`${
                  selectedCertificates.includes(option.id)
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
                  onClick={() => onShapeSelect(shape.id)}
                  className={`${
                    selectedShapes.includes(shape.id)
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
                onClick={() => onColorSelect(option.id)}
                className={`${
                  selectedColors.includes(option.id)
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

          <div className="col-span-2 mt-4 mb-4">
            <h2 className="text-lg font-bold mb-2">Fluorescence</h2>
            <div className="grid grid-cols-6 gap-4">
              {fluorescenceData.map((option) => (
                <button
                  key={option.id}
                  onClick={() => onCutSelect(option.id)}
                  className={`${
                    selectedCuts.includes(option.id)
                      ? "border-pink-500 text-pink-500"
                      : "text-black bg-white border-gray-300"
                  } px-4 py-1 rounded-md border focus:outline-none text-center`}
                >
                  {option.fluorescence}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className=" sticky bottom-0 left-0 right-0 border-t-2 pt-3 bg-gray-50 text-white flex justify-evenly items-center py-2">
        <button className="w-20 mr-4 h-full text-black">Clear</button>
        <button onClick={onClose} className="w-20 mr-4 h-full text-black">
          Cancel
        </button>
        <button
          onClick={onApplyFilters}
          className="bg-gray-900 w-full p-2 h-full rounded focus:outline-none"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
};
