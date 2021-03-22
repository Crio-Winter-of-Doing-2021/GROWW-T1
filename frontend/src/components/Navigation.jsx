import React from "react";
import { Link, withRouter } from "react-router-dom";

function Navigation(props) {
  return (
    
    <div className="navigation">
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">
            GROWW
          </Link>

          <div>
            <ul className="navbar-nav ml-auto">
              <li
                className={`nav-item  ${
                  props.location.pathname === "/explore/stocks" ? "active" : ""
                }`}
              >
                <Link className="nav-link" to="/explore/stocks">
                  Stocks
                  <span className="sr-only">(current)</span>
                </Link>
              </li>
              <li
                className={`nav-item  ${
                  props.location.pathname === "/explore/mutual-funds" ? "active" : ""
                }`}
              >
                <Link className="nav-link" to="/explore/mutual-funds">
                  Mutual Funds
                </Link>
              </li>
              <li
                className={`nav-item  ${
                  props.location.pathname === "/explore/gold" ? "active" : ""
                }`}
              >
                <Link className="nav-link" to="/explore/gold">
                  Gold
                </Link>
              </li>
              <li
                className={`nav-item  ${
                  props.location.pathname === "/explore/us-stocks" ? "active" : ""
                }`}
              >
                <Link className="nav-link" to="/explore/us-stocks">
                  US Stocks
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
export default withRouter(Navigation);
