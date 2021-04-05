import React , {useState, useEffect} from "react";
import {Error, Loading, Navigation} from ".";
import {Card, ListGroup} from "react-bootstrap";
import auth from "../auth";
import Groww from "@material-ui/core/Grow";
function Profile(props)
{
    const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [pan, setPan]= useState("");
    
    useEffect(() => {
        fetch(props.data+auth.user())
          .then((res) => res.json())
          .then(
            (result) => {
              setIsLoaded(true);
              setItems(result);
              setPan(result.kyc_details.pan);
             
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
      <div>
          <Navigation/>
          {isLoaded?
          <Groww in={true}>
            <Card className="prof">
          <Card.Img  src="/Images/login-icon.jpg" />
          <Card.Header> Name: {items.name}</Card.Header>
          <ListGroup variant="flush">
            <ListGroup.Item>Phone number: {items.phone_number}</ListGroup.Item>
            <ListGroup.Item>E-Mail: {items.email}</ListGroup.Item>
            <ListGroup.Item>Pan number: {pan}</ListGroup.Item>
          </ListGroup>
        </Card>

          </Groww>
          :<Loading/>}
    

      </div>
      
    
  );

}
export default Profile;