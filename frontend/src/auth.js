import  { Component } from "react";

class Auth extends Component{
  state= {
    authenticated: true,
    username: ""
  }
    constructor(props) {
      super(props);
      const token=localStorage.getItem("token");
      
      
      this.state.username=token;
      if(token===null)
      {
        
        this.state.authenticated=false;
      }
     
    }
    
  
    
  
    isAuthenticated() {
      return this.state.authenticated;
    }
    user(){
      return this.state.username;
    }
  }
  
  export default new Auth();
  