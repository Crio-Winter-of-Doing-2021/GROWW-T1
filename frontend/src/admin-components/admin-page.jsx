import React, { useState, useEffect } from "react";
import { Form, Alert } from "react-bootstrap";
import axios from "axios";
import { Link, withRouter } from "react-router-dom";
import { AdminNav } from ".";
function AdminPage(props) {
  const [items, setItems] = useState([]);
  const [srNo,setSr]=useState([]);
  const [questions,setQuestions]=useState([]);
  const [answers,setAnswers]=useState([]);
  const [question,setQuestion]=useState("");
  const [answer,setAnswer]=useState("");

  const [state, setState] = useState({
    page: "stocks",
    type: "",
    question: "",
    answer: "",
    id: "",
    newquestion:"",
    newanswer:""
  });
  const [addAlert, setAddAlert] = useState(null);
  const [editAlert, setEditAlert] = useState(null);
  const [deleteAlert, setDeleteAlert] = useState(null);

  const [error, setError] = useState(null);
  useEffect(() => {
    fetch(props.data + state.page)
      .then((res) => res.json())
      .then(
        (result) => {
          let types = [];
          for (let i = 0; i < result[0].subsections.length; i++)
            types.push(result[0].subsections[i].type);
          setItems(types);
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
          let types = [];
          for (let i = 0; i < result[0].subsections.length; i++)
            types.push(result[0].subsections[i].type);
          setItems([]);
          setSr([]);
          setQuestion("");
          setAnswer("");
          setItems(types);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setError(error);
        }
      );
  };
  const handleTypeChange = (e) => {
    const { id, value } = e.target;
    if(e.target.value.length>0)
    {
    fetch(props.data + state.page)
      .then((res) => res.json())
      .then(
        (result) => {
          let ids = [];
          for (let i = 0; i < result[0].subsections.length; i++)
            {
                if(result[0].subsections[i].type===e.target.value)
                {
                    setQuestions(result[0].subsections[i].questions);
                    setAnswers(result[0].subsections[i].answers)
                    for(let j=0;j<result[0].subsections[i].questions.length;j++)
                    ids.push(j+1);
                }
            }
          setSr([]);
          setQuestion("");
          setAnswer("");
          setSr(ids);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setError(error);
        }
      );
    }
    else
    {
      setSr([]);
      setQuestion("");
      setAnswer("");

    }

    setState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };
  const handleIdChange=(e) =>{
    const { id, value } = e.target;
    setQuestion(questions[e.target.value-1]);
    setAnswer( answers[e.target.value-1])
    setState((prevState) => ({
        ...prevState,
        [id]: value,
        
       
      }));

  }
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
      .post("http://localhost:8080/pages/" + state.page, {
        subsection: state.type,
        question: state.question,
        answer: state.answer,
      })
      .then(function(response) {
        setAddAlert(<Alert variant="success">Question successfully added</Alert>);
      })
      .catch(function(error) {
        console.log(error);
        setAddAlert(<Alert variant="danger">Some error occured</Alert>);
      });
  };
  const editQuestion = (e) => {
    e.preventDefault();
    axios
      .patch("http://localhost:8080/pages/" + state.page, {
        subsection: state.type,
        id: state.id,
        newquestion: state.newquestion,
        newanswer: state.newanswer
      })
      .then(function(response) {
        setEditAlert(<Alert variant="success">Question successfully edited</Alert>);
      })
      .catch(function(error) {
        console.log(error);
        setEditAlert(<Alert variant="danger">Some error occured</Alert>);
      });
  };
  const deleteQuestion = (e) => {
    e.preventDefault();
    axios
      .delete("http://localhost:8080/pages/" + state.page, {data: {
        subsection: state.type,
        id: state.id
      }})
      .then(function(response) {
        setDeleteAlert(<Alert variant="success">Question successfully deleted</Alert>);
      })
      .catch(function(error) {
        console.log(error);
        setDeleteAlert(<Alert variant="danger">Some error occured</Alert>);
      });
  };
  console.log(state);

  return (
    <div>
      <AdminNav/>
      <Form onSubmit={addQuestionToServer}>
        <div>Page Section</div>

        <Form.Group controlId="page">
          <Form.Label>Page name</Form.Label>
          <Form.Control as="select" onChange={handlePageChange}>
            <option value="stocks">Stocks</option>
            <option value="mutual_funds">Mutual Funds</option>
            <option value="gold">Gold</option>
            <option value="us_stocks">US Stocks</option>
            <option value="orders">Orders</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="type">
          <Form.Label>Type</Form.Label>
          <Form.Control as="select" onChange={handleTypeChange} required>
            <option value="" selected>
              -
            </option>
            {items.map((item, i) => (
              <option key={i}>{item}</option>
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
            as="textarea" rows={3}
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
        <Form.Group controlId="id">
          <Form.Label>Sr. No.</Form.Label>
          <Form.Control as="select" onChange={handleIdChange} required>
            <option value="" selected>
              -
            </option>
            {srNo.map((item, i) => (
              <option key={i}>{item}</option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="question">
        
          <Form.Label>Question</Form.Label>
          <Form.Control
            type="text"
           
            value={question}
            disabled
            
          />
        </Form.Group>
        <Form.Group controlId="answer">
          <Form.Label>Answer</Form.Label>
          <Form.Control
            as="textarea" rows={3}
            value={answer}
           
            disabled
            
          />
        </Form.Group>
        <Form.Group controlId="newquestion">
          <Form.Label> New Question</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter new question"
            
            onChange={handleOtherChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="newanswer">
          <Form.Label>New Answer</Form.Label>
          <Form.Control
             as="textarea" rows={3}
            placeholder="Enter new answer"
            
            onChange={handleOtherChange}
            required
          />
        </Form.Group>
        <button type="submit" className="login">
          Edit question and asnwer
        </button>
        {editAlert}
      </Form>

      <Form onSubmit={deleteQuestion}>
      <Form.Group controlId="question">
          <Form.Label>Question</Form.Label>
          <Form.Control
            type="text"
            
            value={question}
            disabled
            
          />
        </Form.Group>
        <Form.Group controlId="answer">
          <Form.Label>Answer</Form.Label>
          <Form.Control
             as="textarea" rows={3}
            value={answer}
            
            disabled
            
          />
        </Form.Group>
        <button type="submit" className="login">
          Delete question and answer
        </button>
        {deleteAlert}
      </Form>
    </div>
  );
}
export default AdminPage;
