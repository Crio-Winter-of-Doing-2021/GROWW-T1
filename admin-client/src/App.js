import React from "react";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import { AdminPage,AdminProduct, Error } from "./components";
function App() {
 

  return (

    <div className="App">

      <Router>
       
        
            
                <Switch>
                  
                  <Route exact path="/admin" component={() =><Redirect to ="/admin/pages" ></Redirect>} />
                  <Route exact path="/admin/pages" component={() => <AdminPage data="https://groww-backend.herokuapp.com/"  />} />
                  <Route exact path="/admin/products" component={() => <AdminProduct data="https://groww-backend.herokuapp.com/"  />} />
                  <Route component={() => <Error  />} />

                </Switch>
        <footer />
      </Router>
      

    </div>
  );
}

export default App;