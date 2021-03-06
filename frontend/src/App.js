import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Navigation, Stocks , MutualFunds, Deposits, Gold, UsStocks, CustomChatbot} from "./components";

function App() {
  return (
    <div className="App">
      <Router>
        <Navigation />
        <Switch>
          <Route path="/stocks" exact component={() => < Stocks/>} />
          <Route path="/mutual-funds" exact component={() => <MutualFunds />} />
          <Route path="/deposits" exact component={() => <Deposits />} />
          <Route path="/gold" exact component={() => <Gold />} />
          <Route path="/us-stocks" exact component={() => <UsStocks />} />
        </Switch>
        <CustomChatbot />
        <footer />
      </Router>
    </div>
  );
}

export default App;