import React from "react";

const MobileSearch = () => {
  return (
    <form action="#" method="get" className="mobile-search">
      <label htmlFor="mobile-search" className="sr-only">
        Search
      </label>
      <input
        type="search"
        className="form-control"
        name="mobile-search"
        id="mobile-search"
        placeholder="Search in..."
        required=""
      />
      <button className="btn btn-primary" type="submit">
        <i className="icon-search" />
      </button>
    </form>
  );
};

export default MobileSearch;
