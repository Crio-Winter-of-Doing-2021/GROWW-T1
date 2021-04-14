import React, { useState, useEffect } from "react";
import { Card, Container, } from "react-bootstrap";
import { CustomChatbot, Navigation, Loading, PageNav } from ".";
import { withRouter } from "react-router-dom";
import Grow from "@material-ui/core/Grow";


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
      )
  }, []);
  console.log(items.graph);
  
  return (
    <div className="page">
      <Navigation />
      <PageNav/>
      <div className="container">
        <div className="row align-items-center my-5">
          <Container>
         {isLoaded?
          <Grow in={true}>
          <Card border="dark">
                <Card.Img  src= {items.graph} />
                <Card.Body>
                  <Card.Title>{props.header}</Card.Title>
                  <Card.Text>
                  {items.About}
                  </Card.Text>
                </Card.Body>
                
              </Card>

 
            
             
          </Grow>
         :<Loading/>}
             
                
              
            
          </Container>
        </div>
      </div>
      
      <CustomChatbot data={props.steps} />
    </div>
  );
}

export default withRouter(Gold);