import React from "react";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import { Home, Page, Products, Gold, Orders, Profile, Error } from "./components";
import { AdminPage, AdminProduct} from "./admin-components";
import auth from "./auth";

function App() {
 

  return (

    <div className="App">

      <Router>
       
        
            
                <Switch>
                  {auth.isAuthenticated()?<Route exact path="/"  component={() => <Redirect to ="/explore/stocks" ></Redirect>} />:<Route exact path="/"  component={() => < Home />} />}
                  
                  <Route exact path="/explore/stocks"  component={() => < Page data="http://localhost:8080/stocks" steps="http://localhost:8000/faq_steps/stocks" header="Stocks" loc="/explore/stocks/" />} />
                  <Route exact path="/explore/stocks/:id"  component={() => < Products data="http://localhost:8080/stocks/" steps="http://localhost:8000/faq_steps/product/"/>} />
                  <Route exact path="/explore/mutual-funds"  component={() => <Page data="http://localhost:8080/mutual_funds"  steps="http://localhost:8000/faq_steps/mutual_funds" header="Mutual Funds" loc="/explore/mutual-funds/"/>} />
                  <Route exact path="/explore/mutual-funds/:id"  component={() => <Products data="http://localhost:8080/mutual_funds/" steps="http://localhost:8000/faq_steps/product/"/>} />
               
                  <Route exact path="/explore/gold" component={() => <Gold data="http://localhost:8080/gold"  steps="http://localhost:8000/faq_steps/gold" header="Digital Gold"/>} />

                  <Route exact path="/explore/us-stocks" component={() => <Page data="http://localhost:8080/us_stocks"  steps="http://localhost:8000/faq_steps/us_stocks" header="US Stocks" loc="/explore/us-stocks/"/>} />
                  <Route exact path="/explore/us-stocks/:id"  component={() => <Products data="http://localhost:8080/us_stocks/"  steps="http://localhost:8000/faq_steps/product/"/>} />
                  <Route exact path="/orders" component={() => <Orders data="http://localhost:8080/orders/"  steps="http://localhost:8000/faq_steps/orders"/>} />
                  <Route exact path="/profile" component={() => <Profile data="http://localhost:8080/profile/"  />} />
                  <Route exact path="/admin" component={() =><Redirect to ="/admin/pages" ></Redirect>} />
                  <Route exact path="/admin/pages" component={() => <AdminPage data="http://localhost:8080/"  />} />
                  <Route exact path="/admin/products" component={() => <AdminProduct data="http://localhost:8080/"  />} />
                  <Route component={() => <Error  />} />

                </Switch>
        <footer />
      </Router>
      

    </div>
  );
}

export default App;