import useQuery from "@/hooks/useQuery";
import productService from "@/service/productService";
import { useLocation, useSearchParams } from "react-router-dom";
import queryString from "query-string";
import { useCallback, useEffect, useMemo } from "react";
import { SORT_OPTION } from "@/contants/general";
// Limit
const PRODUCT_LIMITS = 9;
const useProduct = () => {
  // Query String
  const { search } = useLocation();
  const queryObject = queryString.parse(search);
  // use search param
  const [searchParams, setSearchParams] = useSearchParams();
  // Update Query String
  const updateQueryString = (queryObject) => {
    const newQuerryString = queryString.stringify({
      ...queryObject,
      limit: PRODUCT_LIMITS,
    });
    setSearchParams(new URLSearchParams(newQuerryString));
  };
  // fetch API
  const {
    data: dataProduct,
    error: errorProduct,
    loading: loadingProduct,
    refetch: refetchProducrt,
  } = useQuery((query) =>
    productService.getProduct(query || `?limit=${PRODUCT_LIMITS}`)
  );

  const products = dataProduct?.products || [];
  const productsPagination = dataProduct?.pagination || [];
  //categories
  const {
    data: dataProductCategories,
    error: errorProductCategories,
    loading: loadingProductCategories,
  } = useQuery(productService.getCategories);
  const categories = dataProductCategories?.products || [];

  // Product Toolbox
  const activeSort = useMemo(() => {
    return Object.keys(SORT_OPTION)?.find((options) => {
      return (
        (
          options?.queryObject?.order === queryObject?.order &&
          options?.queryObject?.orderBy === queryObject?.orderBy
        )?.valueOf || SORT_OPTION?.popularity?.value
      );
    });
  }, [queryObject]);
  const onChangeSort = (sortType) => {
    const sortQueryString = SORT_OPTION[sortType]?.queryObject;
    if (sortQueryString) {
      updateQueryString({ ...queryObject, ...sortQueryString, page: 1 });
    }
  };
  const productToolBoxProps = {
    showNumb: products?.length || 0,
    onChangeSort,
    totalNumb: productsPagination?.total || 0,
    productsPagination,
    activeSort,
  };
  // Product List props
  const productListProps = {
    isProductCategoriesLoading: loadingProductCategories,
    isProductLoading: loadingProduct,
    isProductError: errorProduct,
    products,
    search,
  };

  // Product Pagination props
  const onChangePagination = (page) => {
    updateQueryString({
      ...queryObject,
      page: page,
    });
  };
  const paginationProps = {
    page: Number(productsPagination?.page || queryObject?.page || 1),
    limit: Number(productsPagination?.limit || 1),
    total: Number(productsPagination?.total || 1),
    onChangePagination,
  };
  //Product Filter
  const onChangeCategories = (cateId) => {
    updateQueryString({ ...queryObject, category: cateId, page: 1 });
  };
  const productFilterProps = {
    showNumb: products?.length || 0,
    categories: categories || [],
    isError: errorProductCategories,
    isLoading: loadingProductCategories,
    activeCategories: queryObject?.category,
    onChangeCategories,
  };
  // useEffect
  useEffect(() => {
    if (search) refetchProducrt?.(search);
  }, [search]);

  return {
    productListProps,
    productToolBoxProps,
    paginationProps,
    productFilterProps,
  };
};

export default useProduct;
