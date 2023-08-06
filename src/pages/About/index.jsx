import React from "react";
import useAbout from "./useAbout";
import BreadCrumb from "@/components/Breadcrumb";
import { Link } from "react-router-dom";
import { PATHS } from "@/contants/paths";

const About = () => {
  const { dataAbout } = useAbout();
  const {
    banner,
    title1,
    title2,
    title3,
    titleBrand,
    description1,
    description2,
    description3,
    descriptionBrand,
    image1,
    image2,
  } = dataAbout?.data || {};
  return (
    <main className="main">
      <BreadCrumb>
        <BreadCrumb.Item>
          <Link to={PATHS.HOME}> Home</Link>
        </BreadCrumb.Item>
        <BreadCrumb.Item isActive>{dataAbout?.title}</BreadCrumb.Item>
      </BreadCrumb>

      <div className="container">
        <div
          className="page-header page-header-big text-center"
          style={{
            backgroundImage: `url(${banner})`,
          }}
        >
          <h1 className="page-title text-white">
            {dataAbout?.title}
            <span className="text-white">{dataAbout?.subTitle}</span>
          </h1>
        </div>
      </div>
      <div className="page-content pb-0">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 mb-3 mb-lg-0">
              <h2 className="title">{title1}</h2>
              <p>{description1}</p>
            </div>
            <div className="col-lg-6">
              <h2 className="title">{title2}</h2>
              <p>{description2}</p>
            </div>
          </div>
          <div className="mb-5" />
        </div>
        <div className="bg-light-2 pt-6 pb-5 mb-6 mb-lg-8">
          <div className="container">
            <div className="row">
              <div className="col-lg-5 mb-3 mb-lg-0">
                <h2 className="title">{title3}</h2>
                <p className="lead text-primary mb-3">{description3}</p>
                {/* <p className="mb-2"></p> */}
              </div>
              <div className="col-lg-6 offset-lg-1">
                <div className="about-images">
                  <img src={image1} alt="" className="about-img-front" />
                  <img src={image2} alt="" className="about-img-back" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-lg-5">
              <div className="brands-text">
                <h2 className="title">{titleBrand}</h2>
                <p>{descriptionBrand}</p>
              </div>
            </div>
            <div className="col-lg-7">
              <div className="brands-display">
                <div className="row justify-content-center">
                  <div className="col-6 col-sm-4">
                    <a href="#" className="brand">
                      <img
                        src="/src/assets/images/brands/1.png"
                        alt="Brand Name"
                      />
                    </a>
                  </div>
                  <div className="col-6 col-sm-4">
                    <a href="#" className="brand">
                      <img
                        src="/src/assets/images/brands/2.png"
                        alt="Brand Name"
                      />
                    </a>
                  </div>
                  <div className="col-6 col-sm-4">
                    <a href="#" className="brand">
                      <img
                        src="/src/assets/images/brands/3.png"
                        alt="Brand Name"
                      />
                    </a>
                  </div>
                  <div className="col-6 col-sm-4">
                    <a href="#" className="brand">
                      <img
                        src="/src/assets/images/brands/4.png"
                        alt="Brand Name"
                      />
                    </a>
                  </div>
                  <div className="col-6 col-sm-4">
                    <a href="#" className="brand">
                      <img
                        src="/src/assets/images/brands/5.png"
                        alt="Brand Name"
                      />
                    </a>
                  </div>
                  <div className="col-6 col-sm-4">
                    <a href="#" className="brand">
                      <img
                        src="/src/assets/images/brands/6.png"
                        alt="Brand Name"
                      />
                    </a>
                  </div>
                  <div className="col-6 col-sm-4">
                    <a href="#" className="brand">
                      <img
                        src="/src/assets/images/brands/7.png"
                        alt="Brand Name"
                      />
                    </a>
                  </div>
                  <div className="col-6 col-sm-4">
                    <a href="#" className="brand">
                      <img
                        src="/src/assets/images/brands/8.png"
                        alt="Brand Name"
                      />
                    </a>
                  </div>
                  <div className="col-6 col-sm-4">
                    <a href="#" className="brand">
                      <img
                        src="/src/assets/images/brands/9.png"
                        alt="Brand Name"
                      />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mb-2" />
      </div>
    </main>
  );
};

export default About;
