import  { Component } from "react";

class Auth extends Component{
  state= {
    authenticated: true,
    username: "",
    kycStatus: ""
  }
    constructor(props) {
      super(props);
      const token=localStorage.getItem("token");
      const kycStatus=localStorage.getItem("kycStatus");
      
      
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
    kyc(){
      return this.state.kycStaus;
    }
  }
  
  export default new Auth();
  