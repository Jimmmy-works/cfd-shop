import { PATHS } from "@/contants/paths";
import React from "react";
import OwlCarousel from "react-owl-carousel";
import { Link } from "react-router-dom";
const BrandSection = ({ brands }) => {
  return (
    <div className="container">
      <OwlCarousel
        nav={false}
        dots={false}
        margin={30}
        loop={false}
        responsive={{
          0: {
            items: 2,
          },
          420: {
            items: 3,
          },
          600: {
            items: 4,
          },
          900: {
            items: 5,
          },
          1024: {
            items: 6,
          },
        }}
        className="owl-carousel mt-5 mb-5 owl-simple"
        data-toggle="owl"
      >
        {brands?.length > 0 &&
          brands?.map((brand, index) => {
            return (
              <Link key={brand?.id || index} to={PATHS.HOME} className="brand">
                <img src={`${brand}`} alt="Brand Name" />
              </Link>
            );
          })}
      </OwlCarousel>
    </div>
  );
};

export default BrandSection;
