import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Home, Page, Products } from "./components";




function App() {
  
  return (

    <div className="App">

      <Router>
        <Route path="/" exact component={() => < Home />} />
        
            
                <Switch>
                  <Route path="/explore/stocks" exact component={() => < Page data="http://localhost:8080/stocks" header="Stocks" loc="/explore/stocks/" />} />
                  <Route path="/stocks/:stock" exact component={() => < Products />} />
                  <Route path="/explore/mutual-funds" exact component={() => <Page data="http://localhost:8080/mutual_funds" header="Mutual Funds" loc="/explore/mutual-funds/"/>} />
                  <Route path="/mutual-funds/:mutual-fund" exact component={() => <Products />} />
               
                  <Route path="/explore/gold" exact component={() => <Page header="Gold"/>} />

                  <Route path="/explore/us-stocks" exact component={() => <Page data="http://localhost:8080/us_stocks" header="US Stocks" loc="/explore/us-stocks/"/>} />
                  <Route path="/us-stocks/:us-stock" exact component={() => <Products />} />

                </Switch>

    









        <footer />
      </Router>
      <Router>

      </Router>

    </div>
  );
}

export default App;