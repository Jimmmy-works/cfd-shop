import { PATHS } from "@/contants/paths";
import { useMemo } from "react";
import { Link } from "react-router-dom";

const PageLink = ({ slug, blogs }) => {
  const origin = window?.location?.origin;
  const PATH = `${origin}${PATHS.BLOG.INDEX}`;
  const checkLink = (_slug, type) => {
    const index = blogs.findIndex((it) => it.slug === _slug);
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
