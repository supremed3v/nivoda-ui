import { useState, useEffect } from "react";
// Include your custom styles

const CustomRangeSlider = ({ data, onChange }) => {
  const [values, setValues] = useState([data[0].id, data[data.length - 1].id]);

  useEffect(() => {
    onChange(values.map((value) => data.find((item) => item.id === value)));
  }, [values, data, onChange]);

  const handleSliderChange = (e) => {
    const newValue = parseInt(e.target.value, 10);
    setValues([values[0], newValue]);
  };

  return (
    <div className="custom-range-slider">
      <input
        type="range"
        min={data[0].id}
        max={data[data.length - 1].id}
        step={1}
        value={values[1]}
        onChange={handleSliderChange}
      />
      <div className="slider-values">
        <span>{data.find((item) => item.id === values[0]).color}</span>
        <span>{data.find((item) => item.id === values[1]).color}</span>
      </div>
    </div>
  );
};

export default CustomRangeSlider;
