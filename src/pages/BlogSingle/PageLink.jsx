import { PATHS } from "@/contants/paths";
import { useMemo } from "react";
import { Link } from "react-router-dom";
// import { current } from "@reduxjs/toolkit";
// import React, { useCallback, useEffect, useMemo, useState } from "react";
// import { Link, Navigate, useNavigate, useParams } from "react-router-dom";

// const PageLink = ({ slug, blogs, refetchBlogDetail }) => {
//   const [currentPost, setCurrentPost] = useState();
//   const [slugBlog, setSlugBlog] = useState(slug);
//   const navigate = useNavigate();
//   let findBlog = blogs?.findIndex((blog, index) => {
//     return blog?.slug === slug;
//   });
//   // if (blogs?.length > 0) {
//   //   if (findBlog === undefined || findBlog < 0) {
//   //     return (findBlog = blogs?.findIndex((blog, index) => {
//   //       return blogs?.[blogs?.length - 1]?.slug;
//   //     }));
//   //   }
//   // }
//   const origin = window?.location?.origin;
//   console.log("blogs", blogs);
//   // const clearHref = () => {
//   //   return window.location.href;
//   // };
//   const checkLink = (_slug, type) => {
//     const index = blogs.findIndex((it) => it.slug === _slug);
//     console.log("🚀index---->", index);
//     console.log(
//       "🚀`${origin}${PATHS.BLOG.INDEX}/${blogs?.[index === blogs.length - 1 ? 0 : index + 1]?.slug}`---->",
//       `${origin}${PATHS.BLOG.INDEX}/${
//         blogs?.[index === blogs.length - 1 ? 0 : index + 1]?.slug
//       }`
//     );
//     console.log("1111111", 1111111);
//     if (index === -1) {
//       console.log("index22222222", index);
//       const myTime = () =>
//         setTimeout(() => {
//           return (findBlog = blogs?.findIndex((blog, index) => {
//             return blogs?.[blogs?.length - 1]?.slug;
//           }));
//         }, 300);
//       myTime();
//       clearTimeout(myTime);
//     }

//     if (type === "next") {
//       console.log(
//         "next5555555",
//         blogs?.[index === blogs.length - 1 ? 0 : index + 1]?.slug
//       );
//       return `${origin}${PATHS.BLOG.INDEX}/${
//         blogs?.[index === blogs.length - 1 ? 0 : index + 1]?.slug
//       }`;
//     }

//     if (type === "prev") {
//       console.log(
//         "prev444444",
//         blogs?.[index === 0 ? blogs.length : index - 1]?.slug
//       );
//       return `${origin}${PATHS.BLOG.INDEX}/${
//         blogs?.[index === 0 ? blogs.length : index - 1]?.slug
//       }`;
//     }
//     // if (type === "next") {
//     //   return `${origin}${PATHS.BLOG.INDEX}/${
//     //     blogs?.[index === blogs.length - 1 ? 0 : index + 1]?.slug
//     //   }`;
//     // }

//     // if (type === "prev") {
//     //   return `${origin}${PATHS.BLOG.INDEX}/${
//     //     blogs?.[index === 0 ? blogs.length : index - 1]?.slug
//     //   }`;
//     // }
//   };
//   if (findBlog === undefined || findBlog < 0) {
//     checkLink(
//       (findBlog = blogs?.findIndex((blog, index) => {
//         return blogs?.[blogs?.length - 1]?.slug;
//       }))
//     );
//   }
//   console.log("findBlog", findBlog);

//   return (
//     <>
//       {blogs?.length && (
//         <nav className="pager-nav" aria-label="Page navigation">
//           <a
//             href={checkLink(slug, "prev")}
//             className="pager-link pager-link-prev"
//           >
//             Previous Post
//             <span className="pager-link-title">
//               {findBlog < 0
//                 ? blogs?.[blogs?.length - 1]?.name
//                 : blogs?.[findBlog - 1]?.name}
//             </span>
//           </a>
//           <a
//             href={checkLink(slug, "next")}
//             className="pager-link pager-link-next"
//           >
//             Next Post{" "}
//             <span className="pager-link-title">
//               {findBlog > blogs?.length - 1
//                 ? blogs?.[0]?.name
//                 : blogs?.[findBlog + 1]?.name}
//             </span>
//           </a>
//         </nav>
//       )}
//     </>
//   );
//   // return (
//   //   <>
//   //     {blogs?.length && (
//   //       <nav className="pager-nav" aria-label="Page navigation">
//   //         <a
//   //           href={`${origin}${PATHS.BLOG.INDEX}/${blogs?.[findBlog - 1]?.slug}`}
//   //           className="pager-link pager-link-prev"
//   //         >
//   //           Previous Post
//   //           <span className="pager-link-title">
//   //             {findBlog < 0
//   //               ? blogs?.[blogs?.length - 1]?.name
//   //               : blogs?.[findBlog - 1]?.name}
//   //           </span>
//   //         </a>
//   //         <a
//   //           href={`${origin}${PATHS.BLOG.INDEX}/${blogs?.[findBlog + 1]?.slug}`}
//   //           className="pager-link pager-link-next"
//   //         >
//   //           Next Post{" "}
//   //           <span className="pager-link-title">
//   //             {findBlog > blogs?.length - 1
//   //               ? blogs?.[0]?.name
//   //               : blogs?.[findBlog + 1]?.name}
//   //           </span>
//   //         </a>
//   //       </nav>
//   //     )}
//   //   </>
//   // );
// };

// export default PageLink;

const origin = window?.location?.origin;
const PageLink = ({ slug, blogs, relatedPostProps }) => {
  const PATH = `${origin}${PATHS.BLOG.INDEX}`;
  const checkLink = (_slug, type) => {
    const index = blogs.findIndex((it) => it.slug === _slug);
    console.log("index", index);
    if (index === -1) {
      return;
    }
    if (type === "next") {
      return {
        slug: `${PATH}/${
          blogs?.[index == blogs.length - 1 ? 0 : index + 1]?.slug
        }`,
        name: blogs?.[index == blogs.length - 1 ? 0 : index + 1]?.name,
      };
    }
    if (type == "prev") {
      return {
        slug: `${PATH}/${
          blogs?.[index == 0 ? blogs.length - 1 : index - 1]?.slug
        }`,
        name: blogs?.[index == 0 ? blogs.length - 1 : index - 1]?.name,
      };
    }
  };
  console.log("blogs", blogs);
  const dataNext = useMemo(() => {
    return checkLink(slug, "next");
  }, [blogs, slug]);

  const dataPrev = useMemo(() => {
    return checkLink(slug, "prev");
  }, [blogs, slug]);
  return (
    <>
      {blogs?.length && (
        <nav className="pager-nav" aria-label="Page navigation">
          <Link to={dataPrev.slug} className={`pager-link pager-link-prev`}>
            Previous Post
            <span className="pager-link-title">{dataPrev.name}</span>
          </Link>
          <Link to={dataNext.slug} className="pager-link pager-link-next">
            Next Post <span className="pager-link-title">{dataNext.name}</span>
          </Link>
        </nav>
      )}
    </>
  );
};

export default PageLink;
