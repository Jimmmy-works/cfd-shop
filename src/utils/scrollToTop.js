import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const BackToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    // "document.documentElement.scrollTo" is the magic for React Router Dom v6
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth", // Optional if you want to skip the scrolling animation
    });
  }, [pathname]);
};
export default BackToTop;
