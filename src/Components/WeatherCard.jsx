import React from "react";

const WeatherCard = () => {
  return (
    <div
      style={{
        width: "12rem",
        height: "10%",
        backgroundColor: "white",
        padding: "15%",
        margin: "5%",
        borderRadius: "10px",
        textAlign: "center",
      }}
    >
      <h4 style={{ fontSize: "20px", padding: "2% 2% 8% 2%" }}>Temperature</h4>
      <p>41 degree celcisus </p>
    </div>
  );
};

export default WeatherCard;
