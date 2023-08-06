import React, { useEffect, useState } from "react";
import MobileSocial from "./MobileSocial";
import MobileSearch from "./MobileSearch";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { PATHS } from "@/contants/paths";
import { useMainContext } from "../MainContext";
import useMobileMenu from "./useMobileMenu";
import { FEATURED_SECTION, MOBILE_OPTION } from "@/contants/general";
import useHome from "@/pages/Home/useHome";

const MobileMenu = () => {
  const {
    handleCloseMobileMenu,
    handleChangeTabCategories,
    categoriesMobile,
    controlScroll,
    setControlScroll,
  } = useMainContext();
  const { featuredProps } = useHome();
  const { categories, selectFeaturedSlug, onSelectFeaturedSlug } =
    featuredProps || {};
  const { onChangeCategory, isCategories } = useMobileMenu();
  const navigate = useNavigate();
  const element = document.getElementById("feature_section");
  const handleClickScroll = (slug) => {
    if (selectFeaturedSlug === slug) return;
    setControlScroll(true);
    handleChangeTabCategories?.(slug);
    onSelectFeaturedSlug?.(slug);
    if (window.location.pathname === "/") {
      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
        handleCloseMobileMenu();
      }
    } else {
      setControlScroll(false);
      navigate("/");
    }
  };
  useEffect(() => {
    const featureSection = document.getElementById("feature_section");
    const myTime = setTimeout(() => {
      if (featureSection && controlScroll) {
        featureSection.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }, 300);
    return () => {
      clearTimeout(myTime);
    };
  }, [categoriesMobile]);
  useEffect(() => {
    onSelectFeaturedSlug(categoriesMobile);
    handleCloseMobileMenu();
  }, [categoriesMobile]);
  return (
    <div className="mobile-menu-container">
      <div className="mobile-menu-wrapper">
        <span onClick={handleCloseMobileMenu} className="mobile-menu-close">
          <i className="icon-close" />
        </span>
        <MobileSearch />
        <ul className="nav nav-pills-mobile nav-border-anim" role="tablist">
          <li
            onClick={() => onChangeCategory(MOBILE_OPTION.menu.tab)}
            className="nav-item"
          >
            <a
              className={`nav-link  ${
                isCategories === MOBILE_OPTION.menu.tab ? "active" : ""
              }`}
            >
              Menu
            </a>
          </li>
          <li
            className="nav-item"
            onClick={() => onChangeCategory(MOBILE_OPTION.category.tab)}
          >
            <a
              className={`nav-link  ${
                isCategories === MOBILE_OPTION.category.tab ? "active" : ""
              }`}
            >
              Categories
            </a>
          </li>
        </ul>
        <div className="tab-content">
          <div
            className={`tab-pane fade ${
              isCategories === MOBILE_OPTION.menu.tab ? "show active" : ""
            }`}
            id="mobile-menu-tab"
            role="tabpanel"
            aria-labelledby="mobile-menu-link"
          >
            <nav className="mobile-nav">
              <ul className="mobile-menu">
                <li>
                  <NavLink onClick={handleCloseMobileMenu} to={PATHS.HOME}>
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink onClick={handleCloseMobileMenu} to={PATHS.ABOUT}>
                    About Us
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    onClick={handleCloseMobileMenu}
                    to={PATHS.PRODUCT.INDEX}
                  >
                    Product
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    onClick={handleCloseMobileMenu}
                    to={PATHS.BLOG.INDEX}
                  >
                    Blog
                  </NavLink>
                </li>
                <li>
                  <NavLink onClick={handleCloseMobileMenu} to={PATHS.CONTACT}>
                    Contact Us
                  </NavLink>
                </li>
              </ul>
            </nav>
            {/* End .mobile-nav */}
          </div>
          {/* .End .tab-pane */}
          <div
            className={`tab-pane fade ${
              isCategories === MOBILE_OPTION.category.tab ? "show active" : ""
            }`}
            id="mobile-cats-tab"
            role="tabpanel"
            aria-labelledby="mobile-cats-link"
          >
            <nav className="mobile-cats-nav">
              <ul className="mobile-cats-menu">
                {categories?.length &&
                  categories?.map((cate, index) => {
                    const { name, slug } = cate || {};
                    return (
                      <li key={slug} onClick={() => handleClickScroll(slug)}>
                        <a
                          className={`${
                            selectFeaturedSlug === slug
                              ? `mobile-cats-lead`
                              : ""
                          }`}
                          onClick={handleClickScroll}
                        >
                          {name}
                        </a>
                      </li>
                    );
                  })}
              </ul>
              {/* End .mobile-cats-menu */}
            </nav>
            {/* End .mobile-cats-nav */}
          </div>
          {/* .End .tab-pane */}
        </div>
        {/* End .tab-content */}
        <MobileSocial />
        {/* End .social-icons */}
      </div>
      {/* End .mobile-menu-wrapper */}
    </div>
  );
};

export default MobileMenu;
