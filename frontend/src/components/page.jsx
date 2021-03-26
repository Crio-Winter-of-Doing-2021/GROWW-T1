import React, { useState, useEffect } from "react";
import { Card, Col, Row, Container } from "react-bootstrap";
import { CustomChatbot, Navigation } from ".";
import { Link, withRouter } from "react-router-dom";
function Page(props) {
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
          setItems(result[0].page);
         
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
            <Row>
              {items.map((item) => (
                <Col size="6" sm="3"  key={item.product_id}>
                  <Card border="dark" className="pageCard">
                    <Card.Img variant="top" src={item.image} />
                    <Card.Body>
                      <Card.Title>{item.product_name}</Card.Title>
                      <Card.Text>
                        <Card.Link href={props.loc + item.product_id}>
                          For more details
                        </Card.Link>
                      </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                      <small className="text-muted">{item.Stock_price}</small>
                    </Card.Footer>
                  </Card>
                </Col>
              ))}
            </Row>
          </Container>
        </div>
      </div>
      <CustomChatbot data={props.steps} />
    </div>
  );
}

export default withRouter(Page);