import React from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

const createSlider = ({
  data,
  selectedValues,
  onValueSelect,
  trackColor = "#F472B6",
  valueKey = "color",
}) => {
  const minIndex = data.findIndex(
    (item) => item[valueKey] === selectedValues[0]
  );
  const maxIndex =
    data.findIndex((item) => item[valueKey] === selectedValues[1]) + 1;

  const step = 1; // Set a default step value

  const onChangeHandler = (value) => {
    const selectedIndices = [
      data.findIndex((item) => item[valueKey] === data[value[0]][valueKey]),
      data.findIndex((item) => item[valueKey] === data[value[1]][valueKey]),
    ];

    onValueSelect(data[selectedIndices[0]][valueKey]);
    onValueSelect(data[selectedIndices[1]][valueKey]);
  };

  const marks = data.reduce((acc, item, index) => {
    acc[index] = {
      label: item[valueKey],
    };
    return acc;
  }, {});

  return (
    <Slider
      range
      min={minIndex}
      max={maxIndex}
      value={
        selectedValues.length > 0
          ? [minIndex, maxIndex - 1]
          : [0, data.length - 1]
      }
      onChange={onChangeHandler}
      trackStyle={[{ backgroundColor: trackColor }]}
      handleStyle={[
        {
          backgroundColor: trackColor,
          borderColor: trackColor,
        },
        {
          backgroundColor: trackColor,
          borderColor: trackColor,
        },
      ]}
      railStyle={{ backgroundColor: trackColor }}
      dotStyle={{ backgroundColor: trackColor }}
      activeDotStyle={{ backgroundColor: trackColor }}
      step={step}
      marks={marks}
    />
  );
};

export default createSlider;
