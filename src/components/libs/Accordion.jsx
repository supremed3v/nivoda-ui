import React, { useState } from "react";
import { FadeInWhenVisible } from "./FadeInWhenVIsible";
const Accordion = ({ title, details, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="mb-4 p-4 bg-white rounded-md">
      <div
        className="cursor-pointer flex justify-between items-center mb-2 text-white bg-gray-600 px-2 py-2 transition duration-500 ease-in-out rounded-md"
        onClick={toggleAccordion}
      >
        <span
          className="text-xl font-medium 
        text-white
        "
        >
          {title}
        </span>
        <span className={`transform ${isOpen ? "rotate-180" : "rotate-0"}`}>
          ▼
        </span>
      </div>
      {isOpen && (
        <FadeInWhenVisible
          animationVariants={{
            visible: { opacity: 1, scale: 1 },
            hidden: { opacity: 0, scale: 0 },
          }}
        >
          <div className="grid grid-cols-3 pt-4 gap-8 transition duration-500 ease-in-out rounded-md">
            {details.map((item, index) => (
              <FadeInWhenVisible
                key={index}
                animationVariants={{
                  visible: { opacity: 1, scale: 1 },
                  hidden: { opacity: 0, scale: 0 },
                }}
              >
                <div
                  key={index}
                  className="mb-2 transition duration-500 ease-in-out rounded-md"
                >
                  {item.label && (
                    <span
                      className="font-semibold
              text-gray-700
              "
                    >
                      {item.label}:
                    </span>
                  )}{" "}
                  <span
                    className={`${
                      item.label ? "text-gray-500 font-bold" : "font-bold"
                    } text-sm`}
                  >
                    {item.value}
                  </span>
                  <hr className=" h-1 my-2 bg-gray-100 border-1 rounded" />
                </div>
              </FadeInWhenVisible>
            ))}
          </div>
        </FadeInWhenVisible>
      )}
    </div>
  );
};

export default Accordion;
