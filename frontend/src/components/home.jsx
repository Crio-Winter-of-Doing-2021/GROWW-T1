import React from "react";
import {Navbar, Nav, FormControl, Form, Button} from 'react-bootstrap';
import {Login} from '.';

function home()
{
    return(
        <>
        <Navbar bg="dark" variant="dark">
    <Navbar.Brand href="/">GROWW</Navbar.Brand>
    <Nav className="mr-auto">
      <Nav.Link href="/explore/stocks">Explore</Nav.Link>
    </Nav>
    <Form inline>
      <FormControl type="text" placeholder="Search stocks and mutual funds" className="mr-sm-2" />
      <Button variant="outline-info">Search</Button>
    </Form>
    <Button onClick={()=>{
      document.getElementById('id01').style.display='block';
      }} variant="primary">Login/Register</Button>
    
  </Navbar>
  <Login/>

  </>

    );

}
export default home;