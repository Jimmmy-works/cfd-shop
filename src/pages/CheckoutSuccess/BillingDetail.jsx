import { Input } from "@/components/Input";
import { countryService } from "@/service/countryService";
import { removeAccents } from "@/utils/removeAccents";
import { Select } from "antd";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Controller } from "react-hook-form";

const BillingDetail = ({ profile, form, mapAddressM }) => {
  const {
    register,
    control,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = form || {};
  // Province
  const [provinces, setProvinces] = useState([]);
  const [provinceId, setProvinceId] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [districtId, setDistrictId] = useState("");
  const [wards, setWards] = useState("");
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

  useEffect(() => {
    if (profile?.province) {
      callAPICitys();
      callAPIDistrict(profile?.province);
      callAPIWard(profile?.district);
      setProvinceId(profile.province);
      setDistrictId(profile?.district);
      setWardId(profile?.ward);
      return;
    }
    callAPICitys();
  }, [profile?.province]);

  ///////////////////
  useEffect(() => {
    if (!!!provinces?.length || !!!districts?.length || !!!wards?.length)
      return;
    const address = mapAddressM(provinces, districts, wards);
    setValue(
      "street",
      `${profile?.street}, ${address?.findWard?.label}, ${address?.findDistrict?.label}, ${address?.findProvince?.label}`
    );
  }, [
    JSON.stringify(provinces),
    JSON.stringify(districts),
    JSON.stringify(wards),
    watch("ward"),
  ]);
  return (
    <div className="col-lg-9">
      <h2 on className="checkout-title">
        Billing Details
      </h2>
      <div className="row">
        <div className="col-sm-4">
          <Input
            label="Full Name "
            {...register("fullName", {
              required: `Please enter your fullname`,
            })}
            error={errors?.fullName?.message}
            type="text"
            required
          />
        </div>
        <div className="col-sm-4">
          <Input
            label="Phone number"
            type="text"
            {...register("phone", {
              required: "Please enter your phone",
              pattern: {
                value: /(84|0[3|5|7|8|9])+([0-9]{8})\b/,
                message: "Invalid phone number ",
              },
            })}
            error={errors?.phone?.message}
            required
          />
        </div>
        <div className="col-sm-4">
          <Input
            label="Email address"
            {...register("email", {
              required: `Please enter your email`,
              pattern: {
                value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                message: "Please enter email fomat abc@gmail.com",
              },
            })}
            error={errors?.email?.message}
            type="text"
            required
          />
        </div>
      </div>
      <div className="row">
        <div className="col-sm-4">
          <label htmlFor="register-email">
            <span>Tỉnh/Thành *</span>
          </label>
          <Controller
            control={control}
            name="province"
            rules={{
              required: `Please enter your city`,
            }}
            render={(
              { field } // :{ onChange, onBlur, value }
            ) => (
              <>
                <Select
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    removeAccents(option?.label ?? "")
                      .toLowerCase()
                      .includes(removeAccents(input.toLowerCase()))
                  }
                  style={{ width: "100%" }}
                  placeholder="Vui lòng chọn Tỉnh/Thành"
                  options={provinces}
                  value={provinceId || null}
                  showSearch
                  onChange={(value) => {
                    field.onChange(value);
                    onChangeProvince(value);
                  }}
                />
                <p className="form-error">{errors?.province?.message || ""}</p>
              </>
            )}
          />
        </div>
        <div className="col-sm-4">
          <label htmlFor="register-email">
            <span>Quận/Huyện *</span>
          </label>
          <Controller
            control={control}
            name="district"
            rules={{
              required: true,
            }}
            render={(
              { field } // :{ onChange, onBlur, value }
            ) => (
              <Select
                filterOption={(input, option) =>
                  removeAccents(option?.label ?? "")
                    .toLowerCase()
                    .includes(removeAccents(input.toLowerCase()))
                }
                optionFilterProp="children"
                style={{ width: "100%" }}
                placeholder="Vui lòng chọn Quận/Huyện"
                options={districts}
                value={districtId || null}
                showSearch
                onChange={(value) => {
                  field.onChange(value);
                  onChangeDistrict(value);
                }}
              />
            )}
          />
        </div>
        <div className="col-sm-4">
          <label htmlFor="register-email">
            <span>Phường/xã *</span>
          </label>
          <Controller
            control={control}
            name="ward"
            rules={{
              required: true,
            }}
            render={(
              { field } // :{ onChange, onBlur, value }
            ) => (
              <Select
                filterOption={(input, option) =>
                  removeAccents(option?.label ?? "")
                    .toLowerCase()
                    .includes(removeAccents(input.toLowerCase()))
                }
                optionFilterProp="children"
                style={{ width: "100%" }}
                placeholder="Vui lòng chọn Quận/Huyện"
                options={wards}
                value={wardId || null}
                showSearch
                onChange={(value) => {
                  field.onChange(value);
                  onChangeWard(value);
                }}
              />
            )}
          />
        </div>
      </div>
      <Input
        error={errors?.street?.message}
        type="text"
        label="Street address"
        required
        {...register("street", {
          required: `Please enter the full address`,
        })}
      />
      <Input
        {...register("note")}
        renderProps={(inputProps) => {
          return (
            <textarea
              {...inputProps}
              className="form-control"
              cols={30}
              rows={4}
              placeholder="Notes about your order, e.g. special notes for delivery"
            />
          );
        }}
      />
      {/* <div className="custom-control custom-checkbox">
        <input
          type="checkbox"
          className="custom-control-input"
          id="checkout-create-acc"
        />
        <label className="custom-control-label" htmlFor="checkout-create-acc">
          Create an account?
        </label>
      </div> */}
    </div>
  );
};

export default BillingDetail;
