import React, { useState, useEffect } from "react";
import { Card, Container, Button, Alert } from "react-bootstrap";
import { CustomChatbot, Navigation, Error, Loading } from ".";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import Grow from "@material-ui/core/Grow";
import axios from "axios";
import auth from "../auth";
function Products(props) {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [count, setCount] = useState(1);
  const [alert, setAlert] = useState(null);
  let { id } = useParams();

  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()
  console.log(id);
  useEffect(() => {
    fetch(props.data + id)
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
  const sendDetailsToServer = () => {
    if (auth.isAuthenticated() && auth.kyc()==="done") {
      axios
        .post("http://localhost:8080/orders/" + auth.user(), {
          productName: items.product_name,
          units: count,
        })
        .then(function(response) {
          if (response.status === 200) {
            setAlert(
              <Alert variant="success">Order successfully placed</Alert>
            );
          } else {
            console.log("Some error ocurred");
          }
        })
        .catch(function(error) {
          console.log(error);
          setAlert(<Alert variant="danger">Order unsuccessfull</Alert>);
        });
    } else if(auth.isAuthenticated()){
      setAlert(<Alert variant="danger">Please complete your KYC Registration</Alert>);
    }
    else{
      setAlert(<Alert variant="danger">Please Log in to place a order</Alert>);
    }
  };
  if (error != null) return <Error />;
  else
    return (
      <div className="products">
        <Navigation />
        <div className="container">
          <div className="row align-items-center my-5">
            <Container>
              {isLoaded?
              <Grow in={true}>
              <Card border="dark">
                 <Card.Img src={items.graph} alt={"Loading image..."} />
                 <Card.Body>
                   <Card.Title>{items.product_name}</Card.Title>
                   <Card.Text>{items.About}</Card.Text>
                   
                     <div className="placeOrderDiv">
                       <Button
                         onClick={() => {
                           count > 1 ? setCount(count - 1) : setCount(1);
                         }}
                       >
                         <FontAwesomeIcon icon={faMinus}></FontAwesomeIcon>
                       </Button>
 
                       <span className="dispUnits">Units: {count}</span>
                       <Button
                         onClick={() => {
                           setCount(count + 1);
                         }}
                       >
                         <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
                       </Button>
                       <hr/>
                       <div>
                         <Button
                           onClick={() => {
                             sendDetailsToServer();
                           }}
                           variant="primary"
                         >
                           Place Order
                         </Button>
                       </div>
                     </div>
                   
                   
                 </Card.Body>
                 <div>{alert}</div>
               </Card>
 
 
              </Grow>:<Loading/>}
             
             
              
              
            </Container>
          </div>
        </div>
        <CustomChatbot data={props.steps + id} />
      </div>
    );
}

export default Products;
