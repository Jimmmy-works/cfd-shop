import { LOCAL_STORAGE } from "@/contants/localStorage";
import useMutation from "@/hooks/useMutation";
import useQuery from "@/hooks/useQuery";
import { authenService } from "@/service/authenService";
import { countryService } from "@/service/countryService";
import orderService from "@/service/orderService";
import { authActions, getProfile } from "@/store/reducer/authReducer";
import { getOrder } from "@/store/reducer/orderReducer";
import { message } from "antd";
import queryString from "query-string";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useSearchParams } from "react-router-dom";

const useDashboard = () => {
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.auth);
  //// Profile
  const [provinces, setProvinces] = useState([]);
  const [provinceId, setProvinceId] = useState("");
  const [districts, setDistricts] = useState([]);
  const [districtId, setDistrictId] = useState("");
  const [wards, setWards] = useState([]);
  const [wardId, setWardId] = useState("");
  const callAPICitys = async () => {
    try {
      const dataProvince = await countryService.getCity();
      if (dataProvince?.data) {
        const _dataTemp = dataProvince?.data?.data.provinces?.map((city) => {
          return { value: city?.id, label: city?.name };
        });
        setProvinces(_dataTemp);
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  const callAPIDistrict = async (provinceId) => {
    try {
      const dataDistrict = await countryService.getDistrict(provinceId);
      if (dataDistrict?.data) {
        const _dataTemp = dataDistrict?.data?.data.districts?.map(
          (district) => {
            return { value: district?.id, label: district?.name };
          }
        );
        setDistricts(_dataTemp);
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  const callAPIWard = async (districtId) => {
    try {
      const dataWard = await countryService.getWard(districtId);
      if (dataWard?.data) {
        const _dataTemp = dataWard?.data?.data.wards?.map((ward) => {
          return { value: ward?.id, label: ward?.name };
        });
        setWards(_dataTemp);
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  const onChangeProvince = (_provinceId) => {
    callAPIDistrict(_provinceId);
    setProvinceId(_provinceId);
    setWardId("");
    setDistrictId("");
  };
  const onChangeDistrict = (_districtId) => {
    callAPIWard(_districtId);
    setDistrictId(_districtId);
    setWardId("");
  };
  const onChangeWard = (_wardId) => {
    setWardId(_wardId);
  };
  const onUpdate = async (payload) => {
    try {
      const resUpdate = await authenService.uploadProfile(payload);
      if (resUpdate?.data?.data) {
        dispatch(authActions?.setProfile(resUpdate?.data?.data));
        message.success(`Cập nhật thông tin thành công !!`);
      }
      return resUpdate?.data?.data;
    } catch (error) {
      console.log("error", error);
      message.success(`Cập nhật thông tin thất bại !!`);
      throw error;
    }
  };
  const profileProps = {
    // Call API
    callAPICitys,
    callAPIDistrict,
    callAPIWard,
    onUpdate,
    // State & Onchange State Province
    provinces,
    provinceId,
    districts,
    districtId,
    wards,
    wardId,
    onChangeProvince,
    onChangeDistrict,
    onChangeWard,
    setProvinceId,
    setDistrictId,
    setWardId,
  };
  //// Order
  const {
    data: dataReview,
    loading: loadingReview,
    error: errorReview,
    execute: executeReview,
  } = useMutation(orderService.postReview, {
    onSuccess: async () => {
      message.success("Review thành công");
    },
    onFail: (error) => {
      console.log("error", error);
      message.error(`${error?.error}`);
    },
  });
  const {
    data: orderMeData,
    loading: loadingMeData,
    error: errorMeData,
  } = useQuery(orderService.getOrderMe);
  const onPostReview = (payload) => {
    if (!payload) return;
    executeReview(payload);
    if (dataReview?.data) dispatch(getOrder());
  };
  const orderProps = {
    orderMeData,
    loadingMeData,
    errorMeData,
    executeReview,
    dataReview,
    onPostReview,
  };

  useEffect(() => {
    callAPICitys();
    if (profile?.province) {
      callAPICitys();
      callAPIDistrict(profile.province);
      callAPIWard(profile?.district);
      setProvinceId(profile.province);
      setDistrictId(profile?.district);
      setWardId(profile?.ward);
    }
  }, [profile?.province]);
  return {
    profileProps,
    orderProps,
  };
};

export default useDashboard;
