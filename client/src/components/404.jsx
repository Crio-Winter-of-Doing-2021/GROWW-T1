import React from "react";
import { Navigation } from ".";
import { Button } from "react-bootstrap";

function Error(props) {
  return (
    <div className="404">
      <Navigation />
      <div className="error-div">
      <h1>Uh Oh!! 404</h1>
      <h1>Page not found</h1>
      <a href="/"><Button variant="primary">
        Go to home page
      </Button></a>

      </div>
     
    </div>
  );
}

export default Error;
