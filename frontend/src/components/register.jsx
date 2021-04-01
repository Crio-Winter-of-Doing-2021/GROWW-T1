import React, { useState } from "react";
import axios from "axios";

function Register (props) {
  const [state , setState] = useState({
    uname : "",
    password : "",
    email: "",
    phone: "",
    pan: ""
})
const handleChange = (e) => {
    const {id , value} = e.target   
    setState(prevState => ({
        ...prevState,
        [id] : value
    }))
}
 const handleSubmitClick = (e) => {
    e.preventDefault();
  
        sendDetailsToServer()    ;
    
}
const  sendDetailsToServer = () => {
    if(state.email.length && state.password.length) {
        const payload={
            "username":state.uname,
            "password":state.password,
            "phone_number": state.phone,
            "email":state.email,
            "kyc_status": "done",
            "pan":state.pan
        }
       if(state.pan.length===0)
       {
           payload.kyc_status="not done";
      }
      
        
        axios.post("http://localhost:8080/registerUser", payload)
            .then(function (response) {
                if(response.status === 201){
                    setState(prevState => ({
                        ...prevState,
                        'successMessage' : 'Registration successful. Redirecting to home page..'
                    }))
                    
                    localStorage.setItem("token",state.uname);
                    window.location.reload();
                    
                   
                } else{
                    console.log("Some error ocurred");
                }
            })
            .catch(function (error) {
                console.log(error);
            });    
    } else {
        props.showError('Please enter valid username and password')    
    }
    
}
  
    
        return (
          <div id="id02" className="modal">
          <span onClick={()=>{
      document.getElementById('id02').style.display='none';
      }}
        className="close" title="Close Modal">&times;</span>
        
          
          <form target="/explore/stocks" className="modal-content animate">
            <div className="imgcontainer">
              <img src="/Images/login-icon.jpg" alt="Avatar" className="avatar"/>
            </div>
        
            <div className="container">
              <label htmlFor="uname"><b>Username</b></label>
              <input type="text" id="uname" placeholder="Enter Username"  value={state.uname} onChange={handleChange} required/>
        
              <label htmlFor="psw"><b>Password</b></label>
              <input type="password" id="password" placeholder="Enter Password" value={state.password} onChange={handleChange} required/>
              <label htmlFor="email"><b>E-mail id</b></label>
              <input type="email" id="email" placeholder="Enter your e-mail id" value={state.email} onChange={handleChange} required/>
              <label htmlFor="phone"><b>Phone number</b></label>
              <input type="tel" id="phone" placeholder="Enter Phone Number" value={state.phone} onChange={handleChange} required/>
              <label htmlFor="pan"><b>Pan Number</b></label>
              <input type="text" id="pan" placeholder="Enter Pan Card Number" value={state.pan} onChange={handleChange} />
        
              <button type="submit" className="login" onClick={handleSubmitClick}>Register</button>
              
            </div>
        
            <div className="container" style={{backgroundColor:"#f1f1f1"}}>
              <button type="button" onClick={()=>{document.getElementById('id02').style.display='none'}} className="cancelbtn">Cancel</button>
              
            </div>
          </form>
        </div>
        );
    
}
export default Register;