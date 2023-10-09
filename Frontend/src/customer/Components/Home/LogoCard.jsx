import React from "react";

const LogoCard = ({ logo, brandName, marginLeft, marginTop, marginCardTop }) => {
  const imgStyle = {
    marginLeft: marginLeft,
    marginTop: marginTop,
  };
  const cardStyle = {
    marginTop: marginCardTop,
  };

  return (
    <div className="card" style={cardStyle}>
      <img src={logo} alt={brandName} style={imgStyle} />
      <h3>{brandName}</h3>
    </div>
  );
};

export default LogoCard;
