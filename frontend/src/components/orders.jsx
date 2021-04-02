import React, { useEffect, useState } from "react";
import auth from "../auth";
import { Navigation, CustomChatbot, Error } from ".";
import { Button, Card, Container, Table } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortUp } from '@fortawesome/free-solid-svg-icons'

function Order(props) {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [steps, setSteps] = useState(props.steps);
  const [uniqueKey, setKey] = useState(0);


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
  const stepProcess = (item) => {
    setSteps(
      "http://localhost:8080/orders/" + auth.user() + "/" + item.order_id
    );
    setKey(item.order_id);
  };
  const tableProcess = (item) => {
   
      const list = [];
      for (const [i] of item.productName.entries()) {
        list.push({
          ind: i,
          prod: item.productName[i],
          price: item.costs[i],
          units: item.units[i],
        });
      }
      return (
        <div id={"order"+item.order_id} className="tableDiv">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Sr. No</th>
                <th>Product</th>
                <th>Units</th>
                <th>Cost</th>
              </tr>
            </thead>
            <tbody>
              {list.map((item) => (
                <tr key={item.ind}>
                  <td>{item.ind}</td>
                  <td>{item.prod}</td>
                  <td>{item.units}</td>
                  <td>{item.price}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      );
    
  };

  console.log(uniqueKey);
  if(auth.isAuthenticated())
  return (
    <div>
      <Navigation />
      <Container className="orderDiv">
        {items.map((item) => (
          <Card border="dark" className="cardDiv" key={item.order_id}>
            <Card.Body>
              <Card.Text>Order ID: {item.order_id}</Card.Text>
              <Card.Text>Status: {item.order_status}</Card.Text>
              <Card.Text>Price: {item.total}</Card.Text>
              <Button
               id={"but"+item.order_id}
                onClick={() => {
                  document.getElementById("order"+item.order_id).style.display="block";
                  document.getElementById("but"+item.order_id).style.display="none";
                  document.getElementById("close"+item.order_id).style.display="inline-block";
                  stepProcess(item);
                  
                 
                }}
                variant="primary"
              >
                Know more
              </Button>
              
              {tableProcess(item)}
              <Button
              className="closeBut"
               id={"close"+item.order_id}
                onClick={() => {
                  document.getElementById("order"+item.order_id).style.display="none";
                  document.getElementById("but"+item.order_id).style.display="inline-block";
                  document.getElementById("close"+item.order_id).style.display="none";
                  setKey(0);
                  setSteps(props.steps);
                 
                }}
                variant="primary"
              ><FontAwesomeIcon icon={faSortUp} ></FontAwesomeIcon></Button>
             
              
            </Card.Body>

          </Card>
        ))}
      </Container>
      <CustomChatbot key={uniqueKey} data={steps} />
    </div>
  );
  else
  return(<Error/>);
}

export default Order;
