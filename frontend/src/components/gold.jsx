import React, { useState, useEffect } from "react";
import { Card, Container } from "react-bootstrap";
import { CustomChatbot, Navigation } from ".";
import { Link, withRouter } from "react-router-dom";

function Gold(props) {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()
  useEffect(() => {
    fetch(props.data)
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result[0]);
         
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);
  console.log(items.graph);

  return (
    <div className="page">
      <Navigation />
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
      <div className="container">
        <div className="row align-items-center my-5">
          <Container>
         
              
                
                  <Card border="dark">
                    <Card.Img  src= {items.graph} />
                    <Card.Body>
                      <Card.Title>{props.header}</Card.Title>
                      <Card.Text>
                      {items.About}
                      </Card.Text>
                    </Card.Body>
                    
                  </Card>
                
              
            
          </Container>
        </div>
      </div>
      <CustomChatbot data={props.steps} />
    </div>
  );
}

export default withRouter(Gold);