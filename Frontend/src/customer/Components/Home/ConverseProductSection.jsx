import React from "react";
import "./ConverseProductSection.css";
import { Link } from "react-router-dom";

const ConverseProductSection = () => {
  return (
    <div className="product-card">
      <div className="product-info-section">
        <div className="product-image ml-10">
          <Link to="/product/404">
            <img
                className="p-8 ml-10"
              //   src="https://www.converse.com/dw/image/v2/BCZC_PRD/on/demandware.static/-/Sites-cnv-master-catalog/default/dw876310c5/images/h_08/A00915C_H_08X1.jpg?sw=406"
              src="https://akn-converse.a-cdn.akinoncloud.com/products/2022/07/19/12206/a174f1a9-6d32-4a20-a744-c48e221c4bad.jpg"
              alt="Product"
              style={{ width: '800px', height: '450px' }}
            />
          </Link>
        </div>
        <div className="product-info mb-10 -mt-10">
          <h2 className="text-lg">Chuck 70 Plus</h2>
          {/* <p className="opacity-40 text-xs py-5">Men's Shoes</p> */}
          <p className="mr-16 text-justify opacity-70 mt-7">
            An unexpected update on an all-time classic, the Chuck 70 Plus mixes
            iconic features with future-forward styling. A fusion of
            mixed-weight canvas comes together with bold, asymmetrical lines for
            a statement-making look. Spliced rubber and ankle patch details keep
            all eyes on you, while premium cushioning helps you stay light on
            your feet
          </p>
        </div>
      </div>
    </div>
  );
};

export default ConverseProductSection;
