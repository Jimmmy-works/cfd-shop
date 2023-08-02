import { PATHS } from "@/contants/paths";
import React from "react";
import { Link, Outlet, useParams } from "react-router-dom";
import BreadCrumb from "@/components/Breadcrumb";
import BlogSidebar from "@/pages/Blog/BlogSidebar";

const BlogLayout = () => {
  const { slug } = useParams();
  return (
    <main className="main">
      {!!!slug && (
        <div
          className="page-header text-center"
          style={{
            backgroundImage: 'url("src/assets/images/page-header-bg.jpg")',
          }}
        >
          <div className="container">
            <h1 className="page-title">Blog</h1>
          </div>
        </div>
      )}
      {!!!slug ? (
        <BreadCrumb>
          <BreadCrumb.Item>
            <Link to={PATHS.HOME}>Home</Link>
          </BreadCrumb.Item>
          <BreadCrumb.Item isActive="true">Blog</BreadCrumb.Item>
        </BreadCrumb>
      ) : (
        <BreadCrumb>
          <BreadCrumb.Item>
            <Link to={PATHS.HOME}>Home</Link>
          </BreadCrumb.Item>
          <BreadCrumb.Item>
            <Link to={PATHS.BLOG.INDEX}>Blog</Link>
          </BreadCrumb.Item>
          <BreadCrumb.Item isActive="true">{slug}</BreadCrumb.Item>
        </BreadCrumb>
      )}
      <div className="page-content">
        <div className="container">
          <div className="row">
            <div className="col-lg-9">
              <Outlet />
            </div>
            <BlogSidebar />
          </div>
        </div>
      </div>
    </main>
  );
};

export default BlogLayout;
