import React, { useEffect, useState } from "react";
import { Route, Redirect, Link, withRouter } from "react-router-dom";
import auth from "../auth";
import { Navigation, CustomChatbot, Error } from ".";
import {Col,Row,Card,Container} from "react-bootstrap";

function Order(props) {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()
  console.log(auth.user());
  useEffect(() => {
    fetch(props.data + auth.user())
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          
          const list=[];
          for (const [i, product] of result.entries()) {
            for(const[j,sub] of product.productName.entries())
            {
                list.push({prod:product.productName[j],price:product.costs[j],units:product.units[j],order_id:i+j});

            }
          }
          setItems(list);
        
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
      <div>
        <Navigation />
        <Container>
            <Row>
            {items.map((item) => (
                <Col size="6" sm="3"  key={item.order_id}>
                  <Card border="dark" className="pageCard">
                    
                    <Card.Body>
                      <Card.Title>{item.prod}</Card.Title>
                      <Card.Text>
                        Units: {item.units}
                      </Card.Text>
                      <Card.Text>
                        Price: {item.price}
                      </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                      <small className="text-muted"></small>
                    </Card.Footer>
                  </Card>
                </Col>
              ))}
            </Row>
          </Container>
          <CustomChatbot data={props.steps} />

      </div>
    );
 
}

export default Order;
