import React, { useMemo } from "react";
import { styled } from "styled-components";

const Pagination = ({ page, limit = 0, total = 0, onChangePagination }) => {
  const PAGE_STEP = 2;
  const totalPage = useMemo(() => {
    if (!limit || !total) return 1;
    return Math.ceil(Number(total) / Number(limit)) || 1;
  }, [total, limit]);
  const pageList = useMemo(() => {
    let start = page - PAGE_STEP;
    let end = page + PAGE_STEP;

    if (start <= 0) {
      start = 1;
      end = start + PAGE_STEP * 2;
      if (end > totalPage) {
        end = totalPage;
      }
    }
    if (end >= totalPage) {
      end = totalPage;
      start = end - PAGE_STEP * 2;
      if (start < 1) {
        start = 1;
      }
    }
    let list = [];
    for (let index = start; index < end + 1; index++) {
      list.push(index);
    }

    return list;
  }, [page, totalPage]);
  const onNext = () => {
    const nextPage = page + 1;
    if (nextPage <= totalPage) {
      onChangePagination(nextPage);
    }
  };
  const onPrev = () => {
    const prevPage = page - 1;
    if (prevPage > 0) {
      onChangePagination(prevPage);
    }
  };
  const onFirst = () => {
    onChangePagination(1);
  };
  const onLast = () => {
    onChangePagination(totalPage);
  };

  return (
    <nav aria-label="Page navigation">
      <ul className="pagination justify-content-center">
        <PaginationItem
          onClick={onPrev}
          className="page-link-prev"
          isDisabled={page <= 1}
        >
          <span aria-hidden="true">
            <i className="icon-long-arrow-left" />
          </span>
          Prev
        </PaginationItem>
        <PaginationItem
          onClick={onFirst}
          className="page-link-prev"
          isDisabled={page <= 1}
        >
          First
        </PaginationItem>
        {pageList?.length > 0 &&
          pageList?.map((pageNumb, index) => {
            return (
              <PaginationItem
                isActive={pageNumb === page}
                onClick={() => onChangePagination(pageNumb)}
                key={pageNumb}
              >
                {pageNumb}
              </PaginationItem>
            );
          })}
        <p>of {totalPage}</p>
        <PaginationItem
          onClick={onLast}
          className="page-link-prev"
          isDisabled={page >= totalPage}
        >
          Last
        </PaginationItem>
        <PaginationItem
          onClick={onNext}
          isDisabled={page >= totalPage}
          className="page-link-next"
        >
          <span aria-hidden="true">
            <i className="icon-long-arrow-right" />
          </span>
          Next
        </PaginationItem>
      </ul>
    </nav>
  );
};
const PaginationItemWrapper = styled.li`
  margin: 0 10px;
  .page-link {
    transition: 0.4s all;
    display: flex;
    gap: 10px;
    .page-link:hover {
      color: #fcb941 !important;
    }
  }
`;
const PaginationItem = ({
  children,
  isActive = false,
  isDisabled = false,
  className = "",
  onClick,
  ...paginationItemProps
}) => {
  return (
    <PaginationItemWrapper
      onClick={() => (isDisabled ? {} : onClick())}
      className={`page-item ${isActive ? "active" : ""} ${className} ${
        isDisabled ? "disabled" : ""
      }`}
      {...paginationItemProps}
    >
      <a className="page-link" role="button">
        {children}
      </a>
    </PaginationItemWrapper>
  );
};
export default Pagination;
