import BreadCrumb from "@/components/Breadcrumb";
import { PATHS } from "@/contants/paths";
import React from "react";
import { Link } from "react-router-dom";
import useContact from "./useContact";
import { Input } from "@/components/Input";

const Contact = () => {
  const { formContact, dataContact, executeContact } = useContact();
  const {
    register,
    setValue,
    getValues,
    watch,
    handleSubmit,
    formState: { errors },
  } = formContact;
  const {
    banner,
    description,
    address,
    email,
    title,
    working,
    workingSunday,
    phone,
  } = dataContact?.data || {};
  const onSubmit = () => {
    const payload = {
      name: getValues("name"),
      title: getValues("title"),
      email: getValues("email"),
      description: getValues("description"),
      phone: getValues("phone"),
    };
    executeContact(payload);
  };
  return (
    <main className="main">
      <BreadCrumb className="border-0 mb-0">
        <BreadCrumb.Item>
          <Link to={PATHS.HOME}>Home</Link>
        </BreadCrumb.Item>
        <BreadCrumb.Item isActive="true">Contact</BreadCrumb.Item>
      </BreadCrumb>

      <div className="container">
        <div
          className="page-header page-header-big text-center"
          style={{
            backgroundImage: `url(${banner})`,
          }}
        >
          <h1 className="page-title text-white">
            {dataContact?.title || ""}
            <span className="text-white">{dataContact?.subTitle || ""}</span>
          </h1>
        </div>
      </div>
      <div className="page-content pb-0">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 mb-2 mb-lg-0">
              <h2 className="title mb-1">{title || ""}</h2>
              <p className="mb-3">{description || ""}</p>
              <div className="row">
                <div className="col-sm-7">
                  <div className="contact-info">
                    <h3>The Office</h3>
                    <ul className="contact-list">
                      <li>
                        <i className="icon-map-marker" /> {address}
                      </li>
                      <li>
                        <i className="icon-phone" />
                        <a href="tel:#">{phone}</a>
                      </li>
                      <li>
                        <i className="icon-envelope" />
                        <a href="mailto:#">{email}</a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-sm-5">
                  <div className="contact-info">
                    <h3>The Office</h3>
                    <ul className="contact-list">
                      <li>
                        <i className="icon-clock-o" />
                        <span className="text-dark"> {working}</span>
                        <br />
                      </li>
                      <li>
                        <i className="icon-calendar" />
                        <span className="text-dark"> {workingSunday}</span>
                        <br />
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <h2 className="title mb-1">Got Any Questions?</h2>
              <p className="mb-2">
                Use the form below to get in touch with the sales team
              </p>
              <div className="contact-form mb-3">
                <div className="row">
                  <div className="col-sm-6">
                    <Input
                      {...register("name", {
                        required: `Please enter your name`,
                      })}
                      label="Name"
                      placeholder="Name"
                      error={errors?.name?.message}
                      required
                    />
                  </div>
                  <div className="col-sm-6">
                    <Input
                      {...register("email", {
                        required: `Please enter your email`,
                        pattern: {
                          value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                          message: "Please enter email fomat abc@gmail.com",
                        },
                      })}
                      error={errors?.email?.message}
                      label="Email"
                      placeholder="Email"
                      required
                    />
                  </div>
                </div>
                <div
                  style={{
                    marginTop: 10,
                  }}
                  className="row"
                >
                  <div className="col-sm-6">
                    <Input
                      {...register("phone", {
                        required: "Please enter your phone",
                        pattern: {
                          value: /(84|0[3|5|7|8|9])+([0-9]{8})\b/,
                          message: "Invalid phone number ",
                        },
                      })}
                      error={errors?.phone?.message}
                      label="Phone"
                      placeholder="Phone"
                      required
                    />
                  </div>
                  <div className="col-sm-6">
                    <Input
                      {...register("title", {
                        required: "Please enter your subject",
                      })}
                      error={errors?.title?.message}
                      label="Subject"
                      placeholder="Subject"
                      required
                    />
                  </div>
                </div>
                <div className="row">
                  <div
                    style={{ flex: "100%", maxWidth: "100%" }}
                    className="col-sm-6"
                  >
                    <Input
                      label="Message"
                      placeholder="Message"
                      {...register("description")}
                      renderProps={(inputProps) => {
                        return (
                          <textarea
                            {...inputProps}
                            className="form-control"
                            cols={30}
                            rows={4}
                            id="cmessage"
                            required=""
                            placeholder="Message *"
                          />
                        );
                      }}
                    />
                  </div>
                </div>
                <button
                  onClick={handleSubmit(onSubmit)}
                  type="submit"
                  className="btn btn-outline-primary-2 btn-minwidth-sm"
                >
                  <span>SUBMIT</span>
                  <i className="icon-long-arrow-right" />
                </button>
              </div>
            </div>
          </div>
          <hr className="mt-4 mb-5" />
          <div className="stores mb-4 mb-lg-5">
            <h2 className="title text-center mb-3">Our Stores</h2>
            <div className="row">
              <div className="col-lg-6">
                <div className="store">
                  <div className="row">
                    <div className="col-sm-5 col-xl-6">
                      <figure className="store-media mb-2 mb-lg-0">
                        <img
                          src="/assets/images/stores/img-1.jpg"
                          alt="image"
                        />
                      </figure>
                    </div>
                    <div className="col-sm-7 col-xl-6">
                      <div className="store-content">
                        <h3 className="store-title">Wall Street Plaza</h3>
                        <address>88 Pine St, New York, NY 10005, USA</address>
                        <div>
                          <a href="tel:#">+1 987-876-6543</a>
                        </div>
                        <h4 className="store-subtitle">Store Hours:</h4>
                        <div>Monday - Saturday 11am to 7pm</div>
                        <div>Sunday 11am to 6pm</div>
                        <a href="#" className="btn btn-link" target="_blank">
                          <span>View Map</span>
                          <i className="icon-long-arrow-right" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="store">
                  <div className="row">
                    <div className="col-sm-5 col-xl-6">
                      <figure className="store-media mb-2 mb-lg-0">
                        <img
                          src="/assets/images/stores/img-2.jpg"
                          alt="image"
                        />
                      </figure>
                    </div>
                    <div className="col-sm-7 col-xl-6">
                      <div className="store-content">
                        <h3 className="store-title">One New York Plaza</h3>
                        <address>88 Pine St, New York, NY 10005, USA</address>
                        <div>
                          <a href="tel:#">+1 987-876-6543</a>
                        </div>
                        <h4 className="store-subtitle">Store Hours:</h4>
                        <div>Monday - Friday 9am to 8pm</div>
                        <div>Saturday - 9am to 2pm</div>
                        <div>Sunday - Closed</div>
                        <a href="#" className="btn btn-link" target="_blank">
                          <span>View Map</span>
                          <i className="icon-long-arrow-right" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="map">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15677.671652456593!2d106.6603257!3d10.7792694!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752940e76e8ccb%3A0x9ed4e323c103e3d1!2sCFD%20Circle!5e0!3m2!1svi!2s!4v1685171988555!5m2!1svi!2s"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </main>
  );
};

export default Contact;
