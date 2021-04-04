import React from "react";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import { Home, Page, Products, Gold, Orders, Profile, Error } from "./components";
import { AdminPage, AdminProduct} from "./admin-components";


function App() {
 

  return (

    <div className="App">

      <Router>
       
        
            
                <Switch>
                <Route path="/" exact component={() => < Home />} />
                  <Route path="/explore/stocks" exact component={() => < Page data="http://localhost:8080/stocks" steps="http://localhost:8080/faq_steps/stocks" header="Stocks" loc="/explore/stocks/" />} />
                  <Route path="/explore/stocks/:id" exact component={() => < Products data="http://localhost:8080/stocks/" steps="http://localhost:8080/faq_steps/product/"/>} />
                  <Route path="/explore/mutual-funds" exact component={() => <Page data="http://localhost:8080/mutual_funds"  steps="http://localhost:8080/faq_steps/mutual_funds" header="Mutual Funds" loc="/explore/mutual-funds/"/>} />
                  <Route path="/explore/mutual-funds/:id" exact component={() => <Products data="http://localhost:8080/mutual_funds/" steps="http://localhost:8080/faq_steps/product/"/>} />
               
                  <Route path="/explore/gold" exact component={() => <Gold data="http://localhost:8080/gold"  steps="http://localhost:8080/faq_steps/gold" header="Digital Gold"/>} />

                  <Route path="/explore/us-stocks" exact component={() => <Page data="http://localhost:8080/us_stocks"  steps="http://localhost:8080/faq_steps/us_stocks" header="US Stocks" loc="/explore/us-stocks/"/>} />
                  <Route path="/explore/us-stocks/:id" exact component={() => <Products data="http://localhost:8080/us_stocks/"  steps="http://localhost:8080/faq_steps/product/"/>} />
                  <Route path="/orders" exact component={() => <Orders data="http://localhost:8080/orders/"  steps="http://localhost:8080/faq_steps/orders"/>} />
                  <Route path="/profile" exact component={() => <Profile data="http://localhost:8080/profile/"  />} />
                  <Route path="/admin" exact component={() =><Redirect to ="/admin/pages" ></Redirect>} />
                  <Route path="/admin/pages" exact component={() => <AdminPage data="http://localhost:8080/"  />} />
                  <Route path="/admin/products" exact component={() => <AdminProduct data="http://localhost:8080/"  />} />
                  <Route path="*" exact component={() => <Error  />} />

                </Switch>
        <footer />
      </Router>
      <Router>

      </Router>

    </div>
  );
}

export default App;