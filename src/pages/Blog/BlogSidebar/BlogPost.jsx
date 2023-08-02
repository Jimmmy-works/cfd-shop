import useQuery from "@/hooks/useQuery";
import blogService from "@/service/blogService";
import React from "react";
const BlogPost = ({}) => {
  return (
    <div className="widget">
      <h3 className="widget-title">Popular Posts</h3>
      {/* <ul className="posts-list">
        {dataBlogUpdateAt?.length &&
          dataBlogUpdateAt?.map((post) => {
            return (
              <li>
                <figure>
                  <a href="#">
                    <img
                      src="/src/assets/images/blog/sidebar/post-4.jpg"
                      alt="post"
                    />
                  </a>
                </figure>
                <div>
                  <span>Nov 25, 2018</span>
                  <h4>
                    <a href="#">Donec quis dui at dolor tempor interdum.</a>
                  </h4>
                </div>
              </li>
            );
          })}
      </ul> */}
    </div>
  );
};

export default BlogPost;
