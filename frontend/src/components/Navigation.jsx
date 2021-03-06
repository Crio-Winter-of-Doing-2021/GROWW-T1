import React from "react";
import { Link, withRouter } from "react-router-dom";

function Navigation(props) {
  return (
    <div className="navigation">
      <nav class="navbar navbar-expand navbar-dark bg-dark">
        <div class="container">
          <Link class="navbar-brand" to="/">
            GROWW
          </Link>

          <div>
            <ul class="navbar-nav ml-auto">
              <li
                class={`nav-item  ${
                  props.location.pathname === "/stocks" ? "active" : ""
                }`}
              >
                <Link class="nav-link" to="/stocks">
                  Stocks
                  <span class="sr-only">(current)</span>
                </Link>
              </li>
              <li
                class={`nav-item  ${
                  props.location.pathname === "/deposits" ? "active" : ""
                }`}
              >
                <Link class="nav-link" to="/deposits">
                  Fixed Deposits
                </Link>
              </li>
              <li
                class={`nav-item  ${
                  props.location.pathname === "/mutual-funds" ? "active" : ""
                }`}
              >
                <Link class="nav-link" to="/mutual-funds">
                  Mutual Funds
                </Link>
              </li>
              <li
                class={`nav-item  ${
                  props.location.pathname === "/gold" ? "active" : ""
                }`}
              >
                <Link class="nav-link" to="/gold">
                  Gold
                </Link>
              </li>
              <li
                class={`nav-item  ${
                  props.location.pathname === "/us-stocks" ? "active" : ""
                }`}
              >
                <Link class="nav-link" to="/us-stocks">
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
