import { MOBILE_OPTION } from "@/contants/general";
import { useState } from "react";

const useMobileMenu = () => {
  const [isCategories, setIsCategories] = useState(MOBILE_OPTION.menu.tab);
  const onChangeCategory = (tab) => {
    setIsCategories(tab);
  };
  return { isCategories, onChangeCategory };
};
export default useMobileMenu;
