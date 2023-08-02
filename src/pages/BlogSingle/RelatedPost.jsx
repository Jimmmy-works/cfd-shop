import React, { useEffect, useState } from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import moment from "moment";
import { Link, useLocation } from "react-router-dom";
import { PATHS } from "@/contants/paths";
const RelatedPost = ({ blogs, slug }) => {
  const imageError =
    "https://cdn.dribbble.com/userupload/2905354/file/original-92212c04a044acd88c69bedc56b3dda2.png?compress=1&resize=1280x1280";

  const filterPost = blogs?.filter((blog) => blog?.slug !== slug);
  const [renderPost, setRenderPost] = useState([]);
  useEffect(() => {
    setRenderPost(filterPost);
  }, [blogs]);
  return (
    <div className="related-posts">
      <h3 className="title">Related Posts</h3>
      {renderPost?.length && (
        <OwlCarousel
          className="owl-carousel owl-simple"
          nav={false}
          dots={true}
          loop={false}
          margin={20}
          responsive={{
            0: {
              items: 1,
            },
            480: {
              items: 2,
            },
            768: {
              items: 2,
            },
          }}
        >
          {renderPost?.length > 0 &&
            renderPost?.map((post, index) => {
              const { author, updatedAt, name, image, slug } = post || {};
              return (
                <article key={post?.id || index} className="entry entry-grid">
                  <figure className="entry-media">
                    <Link
                      to={`${PATHS.BLOG.INDEX}/${slug}`}
                      href="blog-single.html"
                    >
                      <img
                        style={{ minHeight: 425.5, objectFit: "cover" }}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = imageError;
                        }}
                        src={image}
                        alt="image desc"
                      />
                    </Link>
                  </figure>
                  <div className="entry-body">
                    <div className="entry-meta">
                      <span>
                        {moment(updatedAt).format("MMMM Do YYYY, h:mm:ss a")}
                      </span>
                      <span className="meta-separator">|</span>
                      <span className="entry-author">
                        by{" "}
                        <Link to={`${PATHS.BLOG.INDEX}/${slug}`} href="#">
                          {author || ""}
                        </Link>
                      </span>
                    </div>
                    <h2 className="entry-title">
                      <Link
                        to={`${PATHS.BLOG.INDEX}/${slug}`}
                        href="blog-single.html"
                      >
                        {name || ""}
                      </Link>
                    </h2>
                  </div>
                </article>
              );
            })}
        </OwlCarousel>
      )}
    </div>
  );
};

export default RelatedPost;
