import React from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { homeCarouselData } from "./HomeCaroselData";
import { useNavigate } from "react-router-dom";

const handleDragStart = (e) => e.preventDefault();

const HomeCarousel = () => {
  const item = homeCarouselData.map((item) => (
    <img
      src={item.image}
      alt=""
      onDragStart={handleDragStart}
      role="presentation"
      style={{ width: "100%", height: "550px" }}
    />
  ));
  return (
    <AliceCarousel
      mouseTracking
      items={item}
      autoPlay
      infinite
      autoPlayInterval={1500}
      disableButtonsControls
    />
  );
};

export default HomeCarousel;
