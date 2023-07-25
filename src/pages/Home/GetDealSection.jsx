import Button from "@/components/Button";
import { Input } from "@/components/Input";
import React from "react";
import { useForm } from "react-hook-form";

const GetDealSection = ({ executeDeal, loadingDeal, errorDeal }) => {
  const {
    handleSubmit,
    register,
    getValues,
    watch,
    formState: { errors },
  } = useForm();
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
                  <a
                    href="https://www.facebook.com/profile.php?id=100084745624368"
                    className="social-icon social-facebook"
                    title="Facebook"
                    target="_blank"
                  >
                    <i className="icon-facebook-f" />
                  </a>
                  <a
                    href="https://twitter.com/i/flow/login?redirect_after_login=%2F"
                    className="social-icon social-twitter"
                    title="Twitter"
                    target="_blank"
                  >
                    <i className="icon-twitter" />
                  </a>
                  <a
                    href="https://www.instagram.com/"
                    className="social-icon social-instagram"
                    title="Instagram"
                    target="_blank"
                  >
                    <i className="icon-instagram" />
                  </a>
                  <a
                    href="https://www.youtube.com/"
                    className="social-icon social-youtube"
                    title="Youtube"
                    target="_blank"
                  >
                    <i className="icon-youtube" />
                  </a>
                  <a
                    href="https://www.pinterest.com/"
                    className="social-icon social-pinterest"
                    title="Pinterest"
                    target="_blank"
                  >
                    <i className="icon-pinterest" />
                  </a>
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
