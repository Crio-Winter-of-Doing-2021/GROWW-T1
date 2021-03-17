import React, { Component } from "react";

export default class login extends Component {
    render() {
        return (
          <div id="id01" className="modal">
          <span onClick={()=>{
      document.getElementById('id01').style.display='none';
      }}
        className="close" title="Close Modal">&times;</span>
        
          
          <form className="modal-content animate" action="/action_page.php">
            <div className="imgcontainer">
              <img src="img_avatar2.png" alt="Avatar" className="avatar"/>
            </div>
        
            <div className="container">
              <label htmlFor="uname"><b>Username</b></label>
              <input type="text" placeholder="Enter Username" name="uname" required/>
        
              <label htmlFor="psw"><b>Password</b></label>
              <input type="password" placeholder="Enter Password" name="psw" required/>
        
              <button type="submit" className="login">Login</button>
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