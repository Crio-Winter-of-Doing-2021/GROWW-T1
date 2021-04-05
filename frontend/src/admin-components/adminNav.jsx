import React from "react";
import {Link,withRouter} from "react-router-dom";
import {Image,Navbar,Nav} from "react-bootstrap";
function adminNav(props)
{
    return(
      <>
      <Navbar bg="dark" variant="dark" >
          <Navbar.Brand  href="/"><Image src="https://groww.in/favicon-32x32-groww.ico"></Image> <span className="logo">GROWW Admin Panel</span>  </Navbar.Brand>
          
        </Navbar>
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
      </>

    )
   
    

}
export default withRouter(adminNav);