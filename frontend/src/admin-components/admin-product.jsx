import React, { useState, useEffect } from "react";
import { Form, Alert, Card, Container } from "react-bootstrap";
import axios from "axios";
import { AdminNav } from ".";
function AdminProduct(props) {
  const [error, setError] = useState(null);
  
  const [items, setItems] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [srNo, setSr] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [state, setState] = useState({
    page: "stocks",
    id: "",
    sr: "",
    question: "",
    answer: "",
    newquestion: "",
    newanswer: "",
  });
  const [addAlert, setAddAlert] = useState(null);
  const [editAlert, setEditAlert] = useState(null);
  const [deleteAlert, setDeleteAlert] = useState(null);

  useEffect(() => {
    fetch(props.data + state.page)
      .then((res) => res.json())
      .then(
        (result) => {
          setItems([]);
          setItems(result[0].page);
          
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
         
          setError(error);
        }
      );
  }, []);

  const handlePageChange = (e) => {
    const { id, value } = e.target;

    setState((prevState) => ({
      ...prevState,
      [id]: value,
      type: "",
    }));
    fetch(props.data + e.target.value)
      .then((res) => res.json())
      .then(
        (result) => {
          setItems([]);
          setSr([]);
          setAnswer("");
          setQuestion("");
          setItems(result[0].page);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
         
          setError(error);
        }
      );
  };
  const handleIdChange = (e) => {
    const { id, value } = e.target;
    if (e.target.value.length > 0) {
      fetch(props.data + state.page + "/" + e.target.value)
        .then((res) => res.json())
        .then(
          (result) => {
            setQuestions(result.questions);
            setAnswers(result.answers);
            let ids = [];

            for (let j = 0; j < result.questions.length; j++) ids.push(j + 1);
            setSr([]);
            setAnswer("");
            setQuestion("");
            setSr(ids);
          },
          // Note: it's important to handle errors here
          // instead of a catch() block so that we don't swallow
          // exceptions from actual bugs in components.
          (error) => {
           
            setError(error);
          }
        );
    } else {
      setSr([]);
      setAnswer("");
      setQuestion("");
    }

    setState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };
  const handleSrChange = (e) => {
    const { id, value } = e.target;
    setQuestion(questions[e.target.value - 1]);
    setAnswer(answers[e.target.value - 1]);
    setState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };
  const handleOtherChange = (e) => {
    const { id, value } = e.target;

    setState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };
  const addQuestionToServer = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8080/products/" + state.id, {
        question: state.question,
        answer: state.answer,
      })
      .then(function(response) {
        setAddAlert(
          <Alert variant="success">Question successfully added</Alert>
        );
        window.location.reload();
      })
      .catch(function(error) {
        console.log(error);
        setAddAlert(<Alert variant="danger">Some error occured</Alert>);
      });
  };
  const editQuestion = (e) => {
    e.preventDefault();
    axios
      .patch("http://localhost:8080/products/" + state.id, {
        id: state.sr,
        newquestion: state.newquestion,
        newanswer: state.newanswer,
      })
      .then(function(response) {
        setEditAlert(
          <Alert variant="success">Question successfully edited</Alert>
        );
        window.location.reload();
      })
      .catch(function(error) {
        console.log(error);
        setDeleteAlert(<Alert variant="danger">Some error occured</Alert>);
      });
  };
  const deleteQuestion = (e) => {
    e.preventDefault();
    axios
      .delete("http://localhost:8080/products/" + state.id, {
        data: {
          id: state.sr,
        },
      })
      .then(function(response) {
        setDeleteAlert(
          <Alert variant="success">Question successfully deleted</Alert>
        );
        window.location.reload();
      })
      .catch(function(error) {
        console.log(error);
        setDeleteAlert(<Alert variant="danger">Some error occured</Alert>);
      });
  };
  console.log(state);

  return (
    <div>
      <AdminNav />
      <div className="row align-items-center my-5">
        <Container>
          <Card border="dark">
            <Card.Header style={{ textAlign: "center" }}>
              Add, Edit & Delete FAQs
            </Card.Header>
            <Card.Body>
              <Form onSubmit={addQuestionToServer}>
                <Form.Group controlId="page">
                  <Form.Label>Page name</Form.Label>
                  <Form.Control as="select" onChange={handlePageChange}>
                    <option value="stocks">Stocks</option>
                    <option value="mutual_funds">Mutual Funds</option>
                    <option value="us_stocks">US Stocks</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group controlId="id">
                  <Form.Label>Product</Form.Label>
                  <Form.Control as="select" onChange={handleIdChange} required>
                    <option value="">-</option>
                    {items.map((item) => (
                      <option key={item.product_id} value={item.product_id}>
                        {item.product_name}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>

                <Form.Group controlId="question">
                  <Form.Label>Question</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter a question"
                    required
                    onChange={handleOtherChange}
                  />
                </Form.Group>
                <Form.Group controlId="answer">
                  <Form.Label>Answer</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Enter answer"
                    required
                    onChange={handleOtherChange}
                  />
                </Form.Group>
                <button type="submit" className="login">
                  Add Question and answer
                </button>
                {addAlert}
              </Form>
              <Form onSubmit={editQuestion}>
                <Form.Group controlId="sr">
                  <Form.Label>Sr. No.</Form.Label>
                  <Form.Control as="select" onChange={handleSrChange} required>
                    <option value="">-</option>
                    {srNo.map((item, i) => (
                      <option key={i}>{item}</option>
                    ))}
                  </Form.Control>
                </Form.Group>
                <Form.Group controlId="question">
                  <Form.Label>Question</Form.Label>
                  <Form.Control type="text" value={question} disabled />
                </Form.Group>
                <Form.Group controlId="answer">
                  <Form.Label>Answer</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={answer}
                    disabled
                  />
                </Form.Group>
                <Form.Group controlId="newquestion">
                  <Form.Label>New Question</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter question"
                    required
                    onChange={handleOtherChange}
                  />
                </Form.Group>
                <Form.Group controlId="newanswer">
                  <Form.Label>New Answer</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Enter answer"
                    required
                    onChange={handleOtherChange}
                  />
                </Form.Group>
                <button type="submit" className="login">
                  Edit question
                </button>
                {editAlert}
              </Form>

              <Form onSubmit={deleteQuestion}>
                <Form.Group controlId="question">
                  <Form.Label>Question</Form.Label>
                  <Form.Control type="text" value={question} disabled />
                </Form.Group>
                <Form.Group controlId="answer">
                  <Form.Label>Answer</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={answer}
                    disabled
                  />
                </Form.Group>
                <button type="submit" className="login">
                  Delete question
                </button>
                {deleteAlert}
              </Form>
            </Card.Body>
          </Card>
        </Container>
      </div>
    </div>
  );
}
export default AdminProduct;
