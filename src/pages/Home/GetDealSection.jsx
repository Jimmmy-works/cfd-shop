import Button from "@/components/Button";
import { Input } from "@/components/Input";
import ShareLink from "@/components/ShareLink";
import React from "react";
import { useForm } from "react-hook-form";

const GetDealSection = ({ executeDeal, loadingDeal, errorDeal }) => {
  const {
    handleSubmit,
    register,
    getValues,
    setValue,
    watch,
    formState: { errors },
  } = useForm();
  const shareURL = window.location.href;
  const onSubmit = () => {
    if (getValues("email")) {
      executeDeal({ email: getValues("email") });
    }
  };
  return (
    <div className="container">
      <div
        className="cta cta-separator cta-border-image cta-half mb-0"
        style={{
          backgroundImage: "url(assets/images/demos/demo-3/bg-2.jpg)",
        }}
      >
        <div className="cta-border-wrapper bg-white">
          <div className="row">
            <div className="col-lg-6">
              <div className="cta-wrapper cta-text text-center">
                <h3 className="cta-title">Shop Social</h3>
                <p className="cta-desc">
                  Donec nec justo eget felis facilisis fermentum. Aliquam
                  porttitor mauris sit amet orci.{" "}
                </p>
                <div className="social-icons social-icons-colored justify-content-center">
                  <ShareLink
                    type="facebook"
                    path={shareURL}
                    className="social-facebook"
                    title="Facebook"
                  >
                    <i className="icon-facebook-f" />
                  </ShareLink>
                  <ShareLink
                    type="twitter"
                    path={shareURL}
                    title="Twitter"
                    className="social-twitter"
                  >
                    <i className="icon-twitter" />
                  </ShareLink>
                  <ShareLink
                    path="https://www.instagram.com/"
                    className="social-instagram"
                    title="Instagram"
                    type="instagram"
                  >
                    <i className="icon-instagram" />
                  </ShareLink>
                  <ShareLink
                    path="https://www.youtube.com/@CFDCircle"
                    className="social-youtube"
                    title="Youtube"
                    type="youtube"
                  >
                    <i className="icon-youtube" />
                  </ShareLink>
                  <ShareLink
                    className="social-youtube"
                    title="Pinterest"
                    type="pinterest"
                    path={shareURL}
                  >
                    <i className="icon-pinterest" />
                  </ShareLink>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="cta-wrapper text-center">
                <h3 className="cta-title">Get the Latest Deals</h3>
                <p className="cta-desc">
                  and <br />
                  receive <span className="text-primary">$20 coupon</span> for
                  first shopping{" "}
                </p>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="input-group">
                    <Input
                      // error={errors?.email?.message}
                      type="text"
                      placeholder="Enter your Email Address"
                      {...register("email", {
                        pattern: {
                          value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                          message: `Xin vui lòng nhập email để nhận coupon`,
                        },
                      })}
                    />

                    <div className="input-group-append">
                      <Button type="submit">
                        <i className="icon-long-arrow-right" />
                      </Button>
                    </div>
                  </div>
                  <p style={{ textAlign: "left" }} className="form-error">
                    {errors?.email?.message || ""}
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetDealSection;
