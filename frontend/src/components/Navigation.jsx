import React from "react";
import { withRouter } from "react-router-dom";
import {Navbar, Nav, Button, Image, Dropdown} from "react-bootstrap";
import {Login,Register} from ".";
import auth from "../auth";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'

function Navigation(props) {
 
  if(auth.isAuthenticated()){
  return(
    <div className="navigation">
      <Navbar bg="dark" variant="dark">
          <Navbar.Brand ><Image src="https://groww.in/favicon-32x32-groww.ico"></Image> <span className="logo">GROWW</span>  </Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="/explore/stocks">Explore</Nav.Link>
          </Nav>
          <Dropdown>
  <Dropdown.Toggle variant="success" id="dropdown-basic">
  <FontAwesomeIcon icon={faUserCircle} ></FontAwesomeIcon>
  </Dropdown.Toggle>

  <Dropdown.Menu>
    <Dropdown.Item href="/orders">Orders</Dropdown.Item>
    <Dropdown.Item href="/profile">Profile</Dropdown.Item>
    <Dropdown.Item href="/" onClick={() => {
          
            console.log("Logged out");
            localStorage.removeItem("token");
            localStorage.removeItem("kycStatus");
        
        }}>Logout</Dropdown.Item>
  </Dropdown.Menu>
</Dropdown>
          
          
        </Navbar>
        
      
    </div>

  );}
  else 
  return (
    
    <div className="navigation">
      <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="/"><Image src="https://groww.in/favicon-32x32-groww.ico"></Image> <span className="logo">GROWW</span>  </Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="/explore/stocks">Explore</Nav.Link>
          </Nav>
          
          <Button
            onClick={() => {
              document.getElementById("id01").style.display = "block";
            }}
            variant="primary"
            className="logButton"
          >
            Login
          </Button>
          <Button
            onClick={() => {
              document.getElementById("id02").style.display = "block";
            }}
            variant="primary"
            className="logButton"
          >
            Register
          </Button>
        </Navbar>
        <Login/>
        <Register/>
      
    </div>
  );
}
export default withRouter(Navigation);
