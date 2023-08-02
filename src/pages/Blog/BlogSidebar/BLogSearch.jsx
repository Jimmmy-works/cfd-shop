import useDebounce from "@/hooks/useDebounce";
import queryString from "query-string";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Controller } from "react-hook-form";
import { useLocation, useSearchParams } from "react-router-dom";

const BLogSearch = ({ onChangeSearch, searchTerm, setSearchTerm }) => {
  // Serach
  // const [searchTerm, setSearchTerm] = useState();
  // const debouncedSearchTerm = useDebounce(searchTerm, 400);
  const onSearch = (e) => {
    e.preventDefault();
    if (typeof searchTerm === "string") {
      onChangeSearch?.(searchTerm ? `${searchTerm}` : "");
    }
  };
  const onBLurInput = () => {
    if (typeof searchTerm === "string") {
      onChangeSearch?.(searchTerm ? `${searchTerm}` : "");
    }
  };
  useEffect(() => {
    const myClear = setTimeout(() => {
      if (searchTerm === "") {
        onChangeSearch("");
      } else {
      }
    }, 400);
    return () => {
      clearTimeout(myClear);
    };
  }, [searchTerm]);
  return (
    <div className="widget widget-search">
      <h3 className="widget-title">Search</h3>
      <form action="#">
        <label htmlFor="ws" className="sr-only">
          Search in blog
        </label>
        <input
          onBlur={onBLurInput}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          type="search"
          className="form-control"
          placeholder="Search in blog"
          required=""
        />
        <button onClick={onSearch} className="btn">
          <i className="icon-search" />
          <span className="sr-only">Search</span>
        </button>
      </form>
    </div>
  );
};

export default BLogSearch;
