import Loading from "@/components/Loading";
import useDebounce from "@/hooks/useDebounce";
import useMutation from "@/hooks/useMutation";
import useQuery from "@/hooks/useQuery";
import { homeService } from "@/service/homeService";
import { subscribeService } from "@/service/subscribeService";
import { message } from "antd";
import React, { useMemo, useState } from "react";
export const HOT_PRODUCT_TAB = {
  featured: "featured",
  sale: "on-sale",
  top: "top-rated",
};

const useHome = () => {
  // fecth API Home
  const {
    data: dataProduct,
    error: errorProduct,
    loading: loadingProduct,
    refetch: refetchProduct,
  } = useQuery(homeService.getProduct);
  const products = dataProduct?.products || [];
  //---
  const {
    data: dataProductCategories,
    error: errorProductCategories,
    loading: loadingProductCategories,
  } = useQuery(homeService.getProductCategories);
  const categories = dataProductCategories?.products || [];
  //---
  const {
    data: dataHome,
    error: errorHome,
    loading: loadingHome,
  } = useQuery(() => homeService.getPage("home"));
  const brands = dataHome?.data?.brands || [];
  // HotProduct Section
  const [selectHotProductTab, setSelectHotProductTab] = useState(
    `${HOT_PRODUCT_TAB.featured}`
  );
  const hotProductProps = useMemo(() => {
    let hotProducts = [];
    switch (selectHotProductTab) {
      case HOT_PRODUCT_TAB.featured:
        hotProducts = products?.filter((product) => product?.featured);
        break;
      case HOT_PRODUCT_TAB.sale:
        hotProducts = products?.filter((product) => product?.onSale);
        break;
      case HOT_PRODUCT_TAB.top:
        hotProducts = products?.filter((product) => product?.topRated);
        break;
      default:
        return (hotProducts = []);
    }
    return {
      selectHotProductTab,
      hotProducts,
      onSelectHotProductTab: setSelectHotProductTab,
      loadingProduct,
      loadingProductCategories,
      refetchProduct,
      loadingHome,
    };
  }, [selectHotProductTab, products]);
  // Feature Product section
  const [selectFeaturedSlug, setSelectFeaturedSlug] = useState("all");
  const featuredProps = useMemo(() => {
    const featureProduct =
      selectFeaturedSlug === "all"
        ? [...(products || [])]
        : products?.filter((product) => {
            return product?.category?.slug === selectFeaturedSlug;
          });
    return {
      categories: [{ name: "All", slug: "all" }, ...categories],
      loadingProduct,
      loadingProductCategories,
      refetch: refetchProduct,
      selectFeaturedSlug,
      featureProduct,
      onSelectFeaturedSlug: (slug) => setSelectFeaturedSlug(slug),
    };
  }, [selectFeaturedSlug, categories, products]);
  // Get Deal Section
  const {
    execute: executeDeal,
    loading: loadingDeal,
    error: errorDeal,
  } = useMutation(subscribeService.subscribeDeal, {
    onSuccess: (data) => {
      console.log("data", data);
      message.success(`Coupon đã được gửi qua địa chỉ email bạn`);
    },
    onFail: () => {
      console.log("data", data);
      message.error(`Email này đã được đăng kí nhận coupon`);
    },
  });
  const dealProps = {
    executeDeal,
    loadingDeal,
    errorDeal,
  };
  return {
    // Product
    products,
    // categories
    categories,
    //brands
    brands,
    // hotProduct
    hotProductProps,
    // featuredProduct
    featuredProps,
    // get deal
    dealProps,
  };
};
export default useHome;
