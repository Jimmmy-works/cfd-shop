import { useMainContext } from "@/components/MainContext";
import useMutation from "@/hooks/useMutation";
import useQuery from "@/hooks/useQuery";
import { authenService } from "@/service/authenService";
import { countryService } from "@/service/countryService";
import orderService from "@/service/orderService";
import { authActions } from "@/store/reducer/authReducer";
import { message } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
const useDashboard = () => {
  const { profile } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { userGoogle } = useMainContext();
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
      message.error(`Cập nhật thông tin thất bại !!`);
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
    /// google
    userGoogle,
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

  const orderProps = {
    orderMeData,
    loadingMeData,
    errorMeData,
    executeReview,
    dataReview,
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
