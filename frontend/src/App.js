import React from "react";
import { BrowserRouter as Router,  Route, Switch } from "react-router-dom";
import { Navigation, Stocks , MutualFunds, Deposits, Gold, UsStocks, Home} from "./components";

function App() {
  return (
    <div className="App">
      
      <Router>
      <Route path="/" exact component={() => < Home/>} />
        <Navigation />
        <Switch>
          <Route path="/explore/stocks" exact component={() => < Stocks/>} />
          <Route path="/stocks/:stock" exact component={() => < Stocks/>} />
          <Route path="/explore/mutual-funds" exact component={() => <MutualFunds />} />
          <Route path="/mutual-funds/:mutual-fund" exact component={() => <MutualFunds />} />
          <Route path="/explore/deposits" exact component={() => <Deposits />} />
          <Route path="/deposits/:deposit" exact component={() => <MutualFunds />} />
          <Route path="/explore/gold" exact component={() => <Gold />} />
         
          <Route path="/explore/us-stocks" exact component={() => <UsStocks />} />
          <Route path="/us-stocks/:us-stock" exact component={() => <Gold />} />
          

          

        </Switch>
        
        <footer />
      </Router>
      <Router>
      
      </Router>
      
    </div>
  );
}

export default App;