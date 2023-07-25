import React from "react";

const Navbar = () => {
  return (
    <nav className="main-nav">
      <ul className="menu">
        <li className="active">
          <a href="index.html">Home</a>
        </li>
        <li>
          <a href="about.html">About Us</a>
        </li>
        <li>
          <a href="product.html">Product</a>
        </li>
        <li>
          <a href="blog.html">Blog</a>
        </li>
        <li>
          <a href="contact.html">Contact Us</a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
