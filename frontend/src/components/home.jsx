import React, { Component } from "react";
import {  Button } from "react-bootstrap";
import {  Navigation } from ".";
import { withRouter } from "react-router-dom";

import { Card, Col, Row, Container } from "react-bootstrap";

class home extends Component {
  element = [
    { id: 0, data: "stocks" },
    { id: 1, data: "Mutual Funds" },
    { id: 2, data: "US Stocks" },
    { id: 3, data: "Gold" },
    { id: 4, data: "FDs" },
  ];
  state = { count: 0 };
  onAnimationIteration = () => {
    this.setState({ count: (this.state.count + 1) % 5 });
  };
  getElem() {
    var x = this.state.count;
    return this.element.map((mapItem) => {
      let val;
      if (mapItem.id === x) {
        val = mapItem.data;
      }
      return <span> {val}</span>;
    });
  }

  render() {
    return (
      <>
        <Navigation/>
        <Container className="home">
          <Row>
            <Col size="4" sm="6" className="homeCol">
              <div className="invest">
                <h1>
                  Invest in
                  <span
                    className="element"
                    onAnimationIteration={this.onAnimationIteration}
                  >
                    {this.getElem()}
                  </span>
                </h1>
                <p>
                  Join a community of over a <b>Million</b> investors trusting
                  us as their favorite investing platform.
                </p>
                <Button
                  class="started"
                  onClick={() => {
                    document.getElementById("id01").style.display = "block";
                  }}
                  variant="primary"
                >
                  Get Started
                </Button>
              </div>
            </Col>
            <Col size="4" sm="6" className="homeCol">
              <Container className="svgs">
                <Row>
                  <Col size="1" sm="6">
                    <Card border="dark">
                      <Card.Img
                        className="homediv"
                        variant="top"
                        src="/Images/stock.svg"
                      />
                      <Card.Body>
                        <Card.Title>Stocks</Card.Title>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col size="1" sm="6">
                    <Card border="dark">
                      <Card.Img
                        className="homediv"
                        variant="top"
                        src="/Images/mf.svg"
                      />
                      <Card.Body>
                        <Card.Title>Mutual Funds</Card.Title>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col size="1" sm="6">
                    <Card border="dark">
                      <Card.Img
                        className="homediv"
                        variant="top"
                        src="/Images/gold.svg"
                      />
                      <Card.Body>
                        <Card.Title>Gold</Card.Title>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col size="1" sm="6">
                    <Card border="dark">
                      <Card.Img
                        className="homediv"
                        variant="top"
                        src="/Images/uss.svg"
                      />
                      <Card.Body>
                        <Card.Title> US Stocks</Card.Title>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              </Container>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}
export default withRouter(home);
