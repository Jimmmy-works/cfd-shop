import React, { useState } from "react";
import IntroSection from "./IntroSection";
import HotProductSection from "./HotProductSection";
import DealSection from "./DealSection";
import BrandSection from "./BrandSection";
import FeatureSection from "./FeatureSection";
import ServiceSection from "./ServiceSection";
import GetDealSection from "./GetDealSection";
import useHome from "./useHome";

const Home = () => {
  const { hotProductProps, featuredProps, brands, dealProps } = useHome();
  return (
    <main className="main">
      <IntroSection />
      <HotProductSection {...hotProductProps} />
      <div className="mb-7 mb-lg-11" />
      <DealSection />
      <BrandSection brands={brands} />
      <div className="container">
        <hr className="mt-3 mb-6" />
      </div>
      <div className="container">
        <hr className="mt-5 mb-6" />
      </div>
      <FeatureSection {...featuredProps} />
      <div className="container">
        <hr className="mt-5 mb-0" />
      </div>
      <ServiceSection />
      <GetDealSection {...dealProps} />
    </main>
  );
};

export default Home;
