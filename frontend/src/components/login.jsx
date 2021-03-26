import React, { Component, useState } from "react";
import PropTypes from 'prop-types';
async function loginUser(credentials) {
  return fetch('http://localhost:8080/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
 }
export default function Login(props) {
  
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async e => {
    e.preventDefault();
    const token = await loginUser({
      username,
      password
    });
    props.setToken(token);
  }

  
    
        return (
          <div id="id01" className="modal">
          <span onClick={()=>{
      document.getElementById('id01').style.display='none';
      }}
        className="close" title="Close Modal">&times;</span>
        
          
          <form className="modal-content animate" onSubmit={handleSubmit} >
            <div className="imgcontainer">
              <img src="/Images/login-icon.jpg" alt="Avatar" className="avatar"/>
            </div>
        
            <div className="container">
              <label htmlFor="uname"><b>Username</b></label>
              <input type="text" placeholder="Enter Username" onChange={e => setUserName(e.target.value)} required/>
        
              <label htmlFor="psw"><b>Password</b></label>
              <input type="password" placeholder="Enter Password" onChange={e => setPassword(e.target.value)} required/>
        
              <button type="submit" className="login" name="logging in">Login</button>
              <label>
                <input type="checkbox" checked={props.checked} onChange={()=>{}}  name="remember"/> Remember me
              </label>
            </div>
        
            <div className="container" style={{backgroundColor:"#f1f1f1"}}>
              <button type="button" onClick={()=>{document.getElementById('id01').style.display='none'}} className="cancelbtn">Cancel</button>
              <span className="psw">Forgot password?</span>
            </div>
          </form>
        </div>
        );
    
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired
};