import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchCocktailByName } from "../Redux/features/cocktailSlice";

const Header = () => {
  const dispatch = useDispatch();
  const searchTerm = useRef();

  const handleChange = () => {
    const keyword = searchTerm.current.value;
    dispatch(fetchCocktailByName({ keyword }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Cocktail website
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo02"
            aria-controls="navbarTogglerDemo02"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" aria-current="page" to="/about">
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link " to="Contact">
                  Contact
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link " to="/help">
                  Help
                </Link>
              </li>
            </ul>
            <form className="d-flex" role="search" onSubmit={handleSubmit}>
              <input
                className="form-control me-2 bg-light"
                type="search"
                ref={searchTerm}
                onChange={handleChange}
                placeholder="Search"
                aria-label="Search"
              />
            </form>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
