import { elevateZoomDestroy, libraryFunc } from "@/assets/js/main";
import { Image } from "antd";
import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import { useMainContext } from "../MainContext";
const ImageWrapper = styled.div`
  .ant-image {
    display: block;
  }
`;
const ViewZoomImages = ({ images }) => {
  useEffect(() => {
    if (!!images?.length > 0) {
      const script = document.createElement("script");

      script.src = "/assets/js/jquery.elevateZoom.min.js";

      document.body.appendChild(script);
      libraryFunc();
      return () => {
        elevateZoomDestroy();
        document.body.removeChild(script);
      };
    }
  }, [JSON.stringify(images)]);
  const [errorImage, setErrorImage] = useState(false);
  const imageError =
    "https://cdn.dribbble.com/userupload/2905354/file/original-92212c04a044acd88c69bedc56b3dda2.png?compress=1&resize=1280x1280";

  return (
    <div className="product-gallery product-gallery-vertical">
      <div className="row">
        <figure
          style={
            errorImage
              ? { flex: "0 0 100%", maxWidth: "100%" }
              : { flex: "0 0 80%", maxWidth: "80%" }
          }
          className="product-main-image"
        >
          {!!images?.length ? (
            <img
              onError={() => setErrorImage(true)}
              id="product-zoom"
              src={!errorImage ? images[0] : imageError}
              data-zoom-image={!errorImage ? images[0] : imageError}
              alt="product image"
            />
          ) : (
            <ImageWrapper>
              <ImageWrapper>
                <Image
                  fallback="https://cdn.dribbble.com/userupload/2905354/file/original-92212c04a044acd88c69bedc56b3dda2.png?compress=1&resize=1280x1280"
                  alt="product"
                />
              </ImageWrapper>
            </ImageWrapper>
          )}
          {!errorImage && (
            <div id="btn-product-gallery" className="btn-product-gallery">
              <i className="icon-arrows" />
            </div>
          )}
        </figure>
        {!errorImage && (
          <div
            style={{ minHeight: 580 }}
            id="product-zoom-gallery"
            className="product-image-gallery"
          >
            {images?.length &&
              images?.map((image, index) => {
                return (
                  <a
                    key={index}
                    style={{ height: "100px" }}
                    className={`product-gallery-item ${
                      index === 0 && images?.length > 1 ? "active" : ""
                    }`}
                    href="#"
                    data-image={!errorImage ? image : imageError}
                    data-zoom-image={!errorImage ? image : imageError}
                  >
                    <img
                      style={{ height: "100%", objectFit: "cover" }}
                      onError={() => setErrorImage(true)}
                      src={!errorImage ? image : imageError}
                      alt="Dark yellow lace"
                    />
                  </a>
                );
              })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewZoomImages;
