import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import {Navbar, Form, Nav, Button, FormControl, Image} from "react-bootstrap";
import {Login} from ".";
function Navigation(props) {
  
  
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
            className="searchButton"
          >
            Login/Register
          </Button>
        </Navbar>
        <Login/>
      
    </div>
  );
}
export default withRouter(Navigation);
