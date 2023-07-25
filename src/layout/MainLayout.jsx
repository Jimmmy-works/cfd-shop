import React, { useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ButtonBackToTop from "../components/ButtonBackToTop";
import MobileOverplay from "../components/MobileOverplay";
import MobileMenu from "../components/MobileMenu";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import AuthenModal from "../components/AuthenModal";
import { AuthenProvider } from "@/components/MainContext";
import { libraryFunc } from "@/assets/js/main";
import { getProfile } from "@/store/reducer/authReducer";
import { LOCAL_STORAGE } from "@/contants/localStorage";
import { useDispatch } from "react-redux";
import { getCart } from "@/store/reducer/cartReducer";
const MainLayout = (props) => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  // Back to top
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [pathname]);
  // Call MainJS
  useEffect(() => {
    const libraryFuncTimeout = setTimeout(() => {
      libraryFunc();
      return () => clearTimeout(libraryFuncTimeout);
    }, 400);
  }, [pathname]);
  // Call Profile
  useEffect(() => {
    const _token = localStorage.getItem(LOCAL_STORAGE.token);
    if (_token) {
      dispatch(getProfile(_token));
      dispatch(getCart(_token));
    }
  }, []);

  return (
    <AuthenProvider>
      <div className="page-wrapper">
        <Header />
        <Outlet />
        <Footer />
      </div>
      <ButtonBackToTop />
      <AuthenModal />
      <MobileMenu />
      <MobileOverplay />
    </AuthenProvider>
  );
};

export default MainLayout;
