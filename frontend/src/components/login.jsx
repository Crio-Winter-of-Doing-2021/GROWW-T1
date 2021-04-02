import React, { useState } from "react";
import axios from "axios";
import {Alert} from "react-bootstrap";
function Login (props) {
  const [state , setState] = useState({
    email : "",
    password : ""
})
const handleChange = (e) => {
    const {id , value} = e.target   
    setState(prevState => ({
        ...prevState,
        [id] : value
    }))
}
const[Logged, setLogin]=useState("");
 const handleSubmitClick = (e) => {
    e.preventDefault();
  
        sendDetailsToServer()    ;
    
}
const  sendDetailsToServer = () => {
    if(state.email.length && state.password.length) {
       
        const payload={
            "email":state.email,
            "password":state.password,
            "status": "logging in"
        }
        axios.post("http://localhost:8080/loggingUser", payload)
            .then(function (response) {
                if(response.status === 200){
                  setLogin(<Alert variant="success">
                  Login successfull
                </Alert>);
                  localStorage.setItem("token",response.data);
                    setState(prevState => ({
                        ...prevState,
                        'successMessage' : 'Registration successful. Redirecting to home page..'
                    }))
                    
                    
                    window.location.reload();
                    
                   
                } else{
                    console.log("Some error ocurred");
                    setLogin( <Alert variant="danger">
                  {response.data}
                </Alert>);
                }
            })
            .catch(function (error) {
                console.log(error);
                setLogin( <Alert variant="danger">Login unsuccessful. Incorrect username or password.</Alert>);
            });    
    } else {
        props.showError('Please enter valid username and password')    
    }
    
}
  
    
        return (
          <div id="id01" className="modal">
          <span onClick={()=>{
      document.getElementById('id01').style.display='none';
      }}
        className="close" title="Close Modal">&times;</span>
        
          
          <form target="/explore/stocks" className="modal-content animate" onSubmit={handleSubmitClick}>
            <div className="imgcontainer">
              <img src="/Images/login-icon.jpg" alt="Avatar" className="avatar"/>
            </div>
        
            <div className="container">
              <label htmlFor="email"><b>E-Mail ID</b></label>
              <input type="email" id="email" placeholder="Enter Email ID"  value={state.email} onChange={handleChange} required/>
        
              <label htmlFor="password"><b>Password</b></label>
              <input type="password" id="password" placeholder="Enter Password" value={state.password} onChange={handleChange} required/>
        
              <button type="submit" className="login" >Login</button>
              
            </div>
            <div>{Logged}</div>
        
            <div className="container" style={{backgroundColor:"#f1f1f1"}}>
              <button type="button" onClick={()=>{document.getElementById('id01').style.display='none';setLogin("")}} className="cancelbtn">Cancel</button>
              
            </div>
          </form>
        </div>
        );
    
}
export default Login;