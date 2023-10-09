
import React from "react";
import { Link } from "react-router-dom";

const Topics = () => {

  const imageStyle = {
    width: "350px",
    height: "650px",
    borderRadius: "10px",
    marginLeft: "20px",
    cursor: "pointer",
  };

  const paragraphStyle = {
    maxHeight: "30px", 
    whiteSpace: "pre-wrap",
  };

  const containerStyle = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "100px",
  };

  return (
    <div className="col-6 py-10">
        <div style={containerStyle}>
            <div className="">
                <div className="">
                    <div className="">
                        <div className="mt-10 ml-3">
                            <Link to="/women/adidas/running">
                                <img
                                    className=""
                                    src="https://brand.assets.adidas.com/image/upload/f_auto,q_auto,fl_lossy/if_w_gt_800,w_800/enUS/Images/FW22_How-to-Choose-Running-Shoes_HP_tcm221-947954.jpg"
                                    style={imageStyle}
                                />
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="ml-8 mt-5">
                    <span className="">
                        <strong className="">HOW TO CHOOSE RUNNING SHOES</strong>
                    </span>

                    <p className="mt-2 justify-between" style={paragraphStyle}>
                        Team up with adidas and use our running shoe finder to choose your
                        ideal running shoes
                    </p>
                </div>
            </div>

            <div className="">
                <div className="">
                    <div className="">
                        <div className="mt-10 mr-5">
                            <Link to="/women/nike/jordan">
                                <img
                                    className=""
                                    src="https://i.pinimg.com/originals/bf/bd/c3/bfbdc3594a00c17d40043cf2b93e7a93.jpg"
                                    style={imageStyle}
                                />
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="ml-5 mt-5">
                    <span className="">
                        <strong className="">NIKE JORDAN</strong>
                    </span>
                    
                    <p className="mt-2 justify-between" style={paragraphStyle}>
                        Everything you'll need for every mile. Finder to choose your
                        ideal running shoes
                    </p>
                </div>
            </div>
            
            <div className="">
                <div className="">
                    <div className="">
                        <div className="mt-10 ml-1">
                            <Link to="/women/adidas/gym">
                                <img
                                    className=""
                                    src="https://brand.assets.adidas.com/image/upload/f_auto,q_auto,fl_lossy/if_w_gt_800,w_800/enUS/Images/FW22_What-Shoes-to-Wear-to-Gym_HP_tcm221-947951.jpg"
                                    style={imageStyle}
                                />
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="ml-6 mt-5">
                    <span className="">
                        <strong className="">BEST SHOES FOR THE GYM</strong>
                    </span>

                    <p className="mt-2 justify-between" style={paragraphStyle}>
                        Find out what shoes are actually best for your gym workouts with adidas’ top picks
                    </p>
                </div>
            </div>
            
            <div className="">
                <div className="">
                    <div className="">
                        <div className="mt-10 ml-3">
                            <Link to="/women/converse/chuck_70">
                                <img
                                    className=""
                                    src="https://cdn.pomelofashion.com/img/p/2/9/6/5/3/1/296531.jpg"
                                    style={imageStyle}
                                />
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="ml-8 mt-5">
                    <span className="">
                        <strong className="">CONVERSE CHUCK 70</strong>
                    </span>

                    <p className="mt-2 justify-between" style={paragraphStyle}>
                        Team up with converse and use our running shoe finder to choose your
                        ideal running shoes
                    </p>
                </div>
            </div>
        </div>
    </div>
  );
};

export default Topics;
