import React, { useState, useEffect } from "react";
import { Card, Col, Row, Container } from "react-bootstrap";
import { CustomChatbot, Navigation, Error, PageNav,Loading } from ".";
import {withRouter, Link} from "react-router-dom";



import Grow from "@material-ui/core/Grow";

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
          setItems(result[0].page);
          setIsLoaded(true);
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
  if (error != null) return <Error />;
  else
    return (
      <div className="page">
        <Navigation />
        <PageNav />
        
        <div className="container">
          <div className="row align-items-center my-5">
            <Container>
            {isLoaded?
              <Row>
              
                {items.map((item) => (
                 
                  <Grow in={true}  key={item.order_id}>
                    
                     <Col size="6" sm="3">
                      <Card border="dark" className="pageCard">
                        <Card.Img variant="top" src={item.image} />
                        <Card.Body>
                          <Card.Title>{item.product_name}</Card.Title>
                          <Card.Text>
                            <Link className="card-link" to={props.loc + item.product_id}>
                              For more details
                            </Link>
                          </Card.Text>
                        </Card.Body>
                        <Card.Footer>
                          <small className="text-muted">
                            {item.Stock_price}
                          </small>
                        </Card.Footer>
                      </Card>
                    </Col>
                    
                  </Grow>
                  
                   
                ))}
              </Row>
              :<Loading/>}
            </Container>
          </div>
        </div>
        
        <CustomChatbot data={props.steps} />
      </div>
    );
}

export default withRouter(Page);
