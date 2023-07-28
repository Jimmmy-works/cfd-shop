import { Empty } from "antd";
import moment from "moment";
import React from "react";

const ProductDetailReview = ({ dataReview }) => {
  return (
    <>
      {!dataReview?.length && (
        <Empty description="Sorry, there are no reviews for this product." />
      )}
      {dataReview?.length &&
        dataReview?.map((review, index) => {
          return (
            <ProductDetailReviewItem
              key={review?.id}
              {...review}
              index={index}
            />
          );
        })}
    </>
  );
};
const ProductDetailReviewItem = ({
  id,
  title,
  description,
  rate,
  updatedAt,
  order,
  index,
  name,
}) => {
  return (
    <div className="reviews">
      <h3>Reviews ({index + 1})</h3>
      <div style={{ marginBottom: "10px" }} className="review">
        <div className="row no-gutters">
          <div className="col-auto">
            <h4>
              <a href="#">{name || ""} </a>
            </h4>
            <div className="ratings-container">
              <div className="ratings">
                <div
                  className="ratings-val"
                  style={{ width: `${rate * 20}%` }}
                />
              </div>
            </div>
            <span className="review-date">
              {moment(updatedAt).startOf("day").fromNow()}
            </span>
          </div>
          <div className="col">
            <h4>{title}</h4>
            <div className="review-content">
              <p>{description}</p>
            </div>
            <div className="review-action">
              <a href="#">
                <i className="icon-thumbs-up" />
                Helpful (2){" "}
              </a>
              <a href="#">
                <i className="icon-thumbs-down" />
                Unhelpful (0){" "}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProductDetailReview;
