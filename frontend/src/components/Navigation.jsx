import React from "react";
import { withRouter } from "react-router-dom";
import {Navbar, Form, Nav, Button, FormControl} from "react-bootstrap";
import {Login} from ".";
function Navigation(props) {
  return (
    
    <div className="navigation">
      <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="/">GROWW</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="/explore/stocks">Explore</Nav.Link>
          </Nav>
          <Form inline>
            <FormControl
              type="text"
              placeholder="Search stocks and mutual funds"
              className="mr-sm-2"
            />
            <Button variant="outline-info">Search</Button>
          </Form>
          <Button
            onClick={() => {
              document.getElementById("id01").style.display = "block";
            }}
            variant="primary"
          >
            Login/Register
          </Button>
        </Navbar>
        <Login />
      
    </div>
  );
}
export default withRouter(Navigation);
