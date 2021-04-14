
import React from "react";
import {Link,withRouter} from "react-router-dom";
function PageNav(props)
{
    return(
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        
          
          <div className="navbar-collapse collapse w-100 dual-collapse2 order-1 order-md-0">
            <ul className="navbar-nav ml-auto text-center">
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
              </ul>
              </div>
              <div className="navbar-collapse collapse w-100 dual-collapse2 order-1 order-md-0">
            <ul className="navbar-nav ml-auto text-center">
              <li
                className={`nav-item  ${
                  props.location.pathname === "/explore/mutual-funds" ? "active" : ""
                }`}
              >
                <Link className="nav-link" to="/explore/mutual-funds">
                  Mutual Funds
                </Link>
              </li>
              </ul>
              </div>
              <div className="navbar-collapse collapse w-100 dual-collapse2 order-1 order-md-0">
              <ul className="navbar-nav ml-auto text-center">
              <li
                className={`nav-item  ${
                  props.location.pathname === "/explore/gold" ? "active" : ""
                }`}
              >
                <Link className="nav-link" to="/explore/gold">
                  Gold
                </Link>
              </li>
              </ul>
              </div>
              <div className="navbar-collapse collapse w-100 dual-collapse2 order-1 order-md-0">
              <ul className="navbar-nav ml-auto text-center">
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
      
      </nav>
    )

}
export default withRouter(PageNav);