import React from "react";
import {Badge} from "antd";

export const renderSimilarity = (text, record, index) => {
// utils/color.ts
  const getScoreColor = (value) => {
    const red = "#ba3300";
    const orange = { r: 250, g: 140, b: 22 };  // #fa8c16
    const green = { r: 55,  g: 110, b: 24 };   // #376e18

    if (value <= 30) {
      return red;
    }

    if (value >= 75) {
      return `rgb(${green.r}, ${green.g}, ${green.b})`;
    }

    // interpolate only between 31–75
    const ratio = (value - 31) / (75 - 31);

    const r = Math.round(orange.r + (green.r - orange.r) * ratio);
    const g = Math.round(orange.g + (green.g - orange.g) * ratio);
    const b = Math.round(orange.b + (green.b - orange.b) * ratio);

    return `rgb(${r}, ${g}, ${b})`;
  };


  return (
    <Badge
      count={`${text}%`}
      style={{
        backgroundColor: getScoreColor(text),
        borderRadius: "3px",
        fontSize: "0.8em",
        color: "white"
      }}
    />
  );
};
