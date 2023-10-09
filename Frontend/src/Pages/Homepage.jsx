import { BrowserRouter as Router, Link} from "react-router-dom";
import HomeCarousel from "../customer/Components/Carousel/HomeCarousel";
import { homeCarouselData } from "../customer/Components/Carousel/HomeCaroselData";
import HomeProductSection from "../customer/Components/Home/HomeProductSection";
import ProductInfoSection from "../customer/Components/Home/ProductInfoSection";
import AdidasProductSection from "../customer/Components/Home/AdidasProductSection";
import Topics from "../customer/Components/Home/Topics";
import LogoCard from "../customer/Components/Home/LogoCard";
import "../customer/Components/Home/LogoCard.css";
import ConverseProductSection from "../customer/Components/Home/ConverseProductSection";

const Homepage = () => {

  return (
    <div className="">

      <HomeCarousel images={homeCarouselData} />

      <div className="card-container">
        <Link to="/women/adidas/running">
          <LogoCard logo="https://inkythuatso.com/uploads/thumbnails/800/2021/09/logo-adidas-vector-inkythuatso-01-29-09-08-58.jpg"/>
        </Link>
        <Link to="/women/nike/jordan">
          <LogoCard logo="https://static.vecteezy.com/system/resources/thumbnails/010/994/412/small/nike-logo-black-with-name-clothes-design-icon-abstract-football-illustration-with-white-background-free-vector.jpg" marginLeft="5px" marginCardTop="30px"/>
        </Link>
        <Link to="/women/converse/chuck_70">
          <LogoCard logo="https://inkythuatso.com/uploads/thumbnails/800/2021/12/logo-converse-inkythuatso-2-01-06-11-09-39.jpg" marginTop="10px"/>
        </Link>
      </div>

      <div className="display:flex">
        <ProductInfoSection />
      </div>

      <div className="display:flex mt-10">
        <AdidasProductSection/>
      </div>

      <div className="display:flex mt-10">
        <ConverseProductSection />
      </div>

      <div className="space-y-5 py-15">
        <HomeProductSection section={"Product"} />
         
      </div>

      <div>
        <Topics/>
      </div>
    </div>
  );
};

export default Homepage;
