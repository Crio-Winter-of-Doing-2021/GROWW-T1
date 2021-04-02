import React, { useState } from "react";
import axios from "axios";

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
                  localStorage.setItem("token",response.data);
                    setState(prevState => ({
                        ...prevState,
                        'successMessage' : 'Registration successful. Redirecting to home page..'
                    }))
                    
                    
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
        <input type='submit'/>
              <button type="submit" className="login" onClick={handleSubmitClick}>Login</button>
              
            </div>
        
            <div className="container" style={{backgroundColor:"#f1f1f1"}}>
              <button type="button" onClick={()=>{document.getElementById('id01').style.display='none'}} className="cancelbtn">Cancel</button>
              
            </div>
          </form>
        </div>
        );
    
}
export default Login;
