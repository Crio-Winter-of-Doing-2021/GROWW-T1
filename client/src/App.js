import React from "react";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import { Home, Page, Products, Gold, Orders, Profile, Error } from "./components";
import auth from "./auth";

function App() {
 

  return (

    <div className="App">

      <Router>
       
        
            
                <Switch>
                  {auth.isAuthenticated()?<Route exact path="/"  component={() => <Redirect to ="/explore/stocks" ></Redirect>} />:<Route exact path="/"  component={() => < Home />} />}
                  
                  <Route exact path="/explore/stocks"  component={() => < Page data="https://groww-backend.herokuapp.com/stocks" steps="https://contextual-chatbot.herokuapp.com/faq_steps/stocks" header="Stocks" loc="/explore/stocks/" />} />
                  <Route exact path="/explore/stocks/:id"  component={() => < Products data="https://groww-backend.herokuapp.com/stocks/" steps="https://contextual-chatbot.herokuapp.com/faq_steps/product/"/>} />
                  <Route exact path="/explore/mutual-funds"  component={() => <Page data="https://groww-backend.herokuapp.com/mutual_funds"  steps="https://contextual-chatbot.herokuapp.com/faq_steps/mutual_funds" header="Mutual Funds" loc="/explore/mutual-funds/"/>} />
                  <Route exact path="/explore/mutual-funds/:id"  component={() => <Products data="https://groww-backend.herokuapp.com/mutual_funds/" steps="https://contextual-chatbot.herokuapp.com/faq_steps/product/"/>} />
               
                  <Route exact path="/explore/gold" component={() => <Gold data="https://groww-backend.herokuapp.com/gold"  steps="https://contextual-chatbot.herokuapp.com/faq_steps/gold" header="Digital Gold"/>} />

                  <Route exact path="/explore/us-stocks" component={() => <Page data="https://groww-backend.herokuapp.com/us_stocks"  steps="https://contextual-chatbot.herokuapp.com/faq_steps/us_stocks" header="US Stocks" loc="/explore/us-stocks/"/>} />
                  <Route exact path="/explore/us-stocks/:id"  component={() => <Products data="https://groww-backend.herokuapp.com/us_stocks/"  steps="https://contextual-chatbot.herokuapp.com/faq_steps/product/"/>} />
                  <Route exact path="/orders" component={() => <Orders data="https://groww-backend.herokuapp.com/orders/"  steps="https://contextual-chatbot.herokuapp.com/faq_steps/orders"/>} />
                  <Route exact path="/profile" component={() => <Profile data="https://groww-backend.herokuapp.com/profile/"  />} />
                 
                  <Route component={() => <Error  />} />

                </Switch>
        <footer />
      </Router>
      

    </div>
  );
}

export default App;