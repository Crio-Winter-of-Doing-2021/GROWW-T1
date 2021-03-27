import React, { Component } from "react";

export default class login extends Component {
  
    render() {
        return (
          <div id="id01" className="modal">
          <span onClick={()=>{
      document.getElementById('id01').style.display='none';
      }}
        className="close" title="Close Modal">&times;</span>
        
          
          <form className="modal-content animate" method="post" action="localhost:8080/loggingUser">
            <div className="imgcontainer">
              <img src="/Images/login-icon.jpg" alt="Avatar" className="avatar"/>
            </div>
        
            <div className="container">
              <label htmlFor="uname"><b>Username</b></label>
              <input type="text" placeholder="Enter Username" name="username" required/>
        
              <label htmlFor="psw"><b>Password</b></label>
              <input type="password" placeholder="Enter Password" name="password" required/>
        
              <button type="submit" className="login" name="logging in">Login</button>
              <label>
                <input type="checkbox" checked={this.props.checked} onChange={()=>{}}  name="remember"/> Remember me
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
}