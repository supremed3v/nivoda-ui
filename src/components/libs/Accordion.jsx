import React, { useState } from "react";

const Accordion = ({ title, details, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="mb-4 p-4 bg-gray-200 rounded-md">
      <div
        className="cursor-pointer flex justify-between items-center mb-2 text-gray-600"
        onClick={toggleAccordion}
      >
        <span className="text-lg font-medium">{title}</span>
        <span className={`transform ${isOpen ? "rotate-180" : "rotate-0"}`}>
          ▼
        </span>
      </div>
      {isOpen && (
        <div className="grid grid-cols-4 gap-4">
          {details.map((item, index) => (
            <div key={index} className="mb-2">
              {item.label && <span className="font-bold">{item.label}:</span>}{" "}
              <span
                className={`${
                  item.label ? "text-gray-500 font-bold" : "font-bold"
                } text-sm`}
              >
                {item.value}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Accordion;
