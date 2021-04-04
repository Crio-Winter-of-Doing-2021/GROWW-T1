import React from "react";
import {Link,withRouter} from "react-router-dom";
function adminNav(props)
{
    return(
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="navbar-collapse collapse w-100 dual-collapse2 order-1 order-md-0">
          <ul className="navbar-nav ml-auto text-center">
            <li
              className={`nav-item  ${
                props.location.pathname === "/admin/pages" ? "active" : ""
              }`}
            >
              <Link className="nav-link" to="/admin/pages">
                Page FAQs
                <span className="sr-only">(current)</span>
              </Link>
            </li>
          </ul>
        </div>
        <div className="navbar-collapse collapse w-100 dual-collapse2 order-1 order-md-0">
          <ul className="navbar-nav ml-auto text-center">
            <li
              className={`nav-item  ${
                props.location.pathname === "/admin/products"
                  ? "active"
                  : ""
              }`}
            >
              <Link className="nav-link" to="/admin/products">
                Product FAQs
              </Link>
            </li>
          </ul>
        </div>
      </nav>

    )
   
    

}
export default withRouter(adminNav);