import React from "react";
import "./Hero.css";

const Hero: React.FC = () => {
  return (
    <div className="heыro-container">
      <img
        src="https://via.placeholder.com/1500x500"
        alt="Фоновое изображение"
        className="hero-image"
      />
      <div className="hero-text-overlay">
        <h1 className="hero-title">Санаторно-курортное лечение и отдых</h1>
        <p className="hero-subtitle">В России и ближнем зарубежье</p>
      </div>
    </div>
  );
};

export default Hero;
