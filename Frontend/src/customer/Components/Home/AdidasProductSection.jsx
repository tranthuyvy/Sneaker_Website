import React from "react";
import "./AdidasProductSection.css";
import { Link } from "react-router-dom";

const AdidasProductSection = () => {
  return (
    <div className="product-card">
      <div className="product-info-section">
        <div className="product-info mb-10 -mt-10 ml-5">
          <h2 className="text-lg">Adidas UltraBoost 4.0 'Non-Dyed White'</h2>
          {/* <p className="opacity-40 text-xs py-5">Men's Shoes</p> */}
          <p className="mt-7 text-justify opacity-70">
            Adidas Ultra Boost 4.0 Cloud White Non Dyed W sneaker features a
            Cloud White Primeknit upper with black speckles highlighted by a
            pristine white midfoot lace cage and TPU heel counter. The midfoot
            lace cage shapes up to form adidas’ signature Three Stripes.
            Branding details include the silver Ultra Boost branding on the
            lateral side of the heel cage and a tonal adidas mountain logo on
            the tongue tag. A white Boost midsole and a black Continental rubber
            outsole round out this sneaker’s design.
          </p>
        </div>
        <div className="product-image ml-10 -mr-10">
          <Link to="/product/403">
            <img
              src="https://2app.kicksonfire.com/kofapp/upload/events_images/ipad_adidas-wmns-ultra-boost-4-0-cloud-white-non-dyed-6.jpg"
              alt="Product"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdidasProductSection;
