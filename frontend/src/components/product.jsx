import React, { useState, useEffect } from "react";
import { Card, Container } from "react-bootstrap";
import { CustomChatbot, Navigation, Error } from ".";
import { useParams } from 'react-router-dom';

function Products(props) {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  let {id}= useParams();

  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()
  console.log(id);
  useEffect(() => {
    fetch(props.data+id)
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
         
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
  if(error!=null)
  return(<Error/>);
  else  
  return (
    <div className="products">
      <Navigation />
      <div className="container">
        <div className="row align-items-center my-5">
          <Container>
          <Card border="dark">
                    <Card.Img src={items.graph} alt={"Loading image..."} />
                    <Card.Body>
                      <Card.Title>{items.product_name}</Card.Title>
                      <Card.Text>
                      {items.About}
                      </Card.Text>
                    </Card.Body>
                    
                  </Card>
                
              
            
          </Container>
        </div>
      </div>
      <CustomChatbot data={props.steps+id} />
    </div>
  );
}

export default Products;