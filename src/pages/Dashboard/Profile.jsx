import Button from "@/components/Button";
import { Input } from "@/components/Input";
import React, { useEffect, useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import useDashboard from "./useDashboard";
import { Select } from "antd";
import dayjs from "dayjs";
import { removeAccents } from "@/utils/removeAccents";

const Profile = ({
  profile,
  onUpdate,
  provinces,
  provinceId,
  districts,
  districtId,
  wards,
  wardId,
  onChangeProvince,
  onChangeDistrict,
  onChangeWard,
}) => {
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    watch,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: profile?.firstName,
      lastName: " ",
      email: profile?.email,
      phone: profile?.phone,
      province: profile?.province,
      district: profile?.district,
      street: profile?.street,
      ward: profile?.ward,
      birthday: profile?.birthday
        ? dayjs(profile?.birthday || `01-01-2000`)
            .format(`YYYY/MM/DD`)
            .replaceAll("/", "-")
        : "",
    },
  });

  // handle Update Profile
  const onSubmit = (data) => {
    if (data) {
      const payload = {
        firstName: data?.firstName || "",
        lastName: " ",
        email: data?.email,
        phone: data?.phone || "",
        province: data?.province || "",
        district: data?.district || "",
        ward: data?.ward || "",
        street: data?.street || "",
        birthday: data?.birthday,
      };
      onUpdate(payload);
    }
  };

  // useEffect(() => {
  //   callAPICitys();
  // }, []);

  // useEffect(() => {
  //   if (profile) {
  //     for (const field in profile) {
  //       setValue(field, profile[field]);
  //     }
  //   }
  // }, [profile]);
  useEffect(() => {
    reset({
      firstName: profile?.firstName,
      lastName: " ",
      email: profile?.email,
      phone: profile?.phone,
      province: profile?.province,
      district: profile?.district,
      street: profile?.street,
      ward: profile?.ward,
      birthday: profile?.birthday
        ? dayjs(profile?.birthday || `01-01-2000`)
            .format(`YYYY/MM/DD`)
            .replaceAll("/", "-")
        : "",
    });
  }, []);

  return (
    <div
      className="tab-pane fade active show"
      id="tab-account"
      role="tabpanel"
      aria-labelledby="tab-account-link"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="account-form">
        <div className="row">
          <div className="col-sm-6">
            <Input
              label="Full name"
              {...register("firstName", {
                required: `Please enter your fullname`,
              })}
              error={errors?.firstName?.message}
              type="text"
              required
            />
          </div>
          <div className="col-sm-6">
            <Input
              disabled
              label="Email"
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
          <div className="col-sm-6">
            <label>Phone number *</label>
            <Input
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
          <div className="col-sm-6">
            <Input
              label="Birthday"
              type="date"
              required
              {...register("birthday", {
                required: `Please enter your birthday`,
              })}
              error={errors?.birthday?.message}
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
                required: true,
              }}
              render={(
                { field } // :{ onChange, onBlur, value }
              ) => (
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
          error={errors?.address?.message}
          type="text"
          label="Street address"
          required
          {...register("street", {
            required: `Please enter the full address`,
          })}
        />
        <Input
          type="password"
          label="Current password (leave blank to leave unchanged)"
          required
          {...register("currentPassword")}
        />
        <Input
          type="password"
          label="New password (leave blank to leave unchanged)"
          required
          {...register("newPassword")}
        />
        <Input type="password" label="Confirm new password " required />

        <Button type="submit" variant="outline">
          <span>SAVE CHANGES</span>
          <i className="icon-long-arrow-right" />
        </Button>
      </form>
    </div>
  );
};

export default Profile;
