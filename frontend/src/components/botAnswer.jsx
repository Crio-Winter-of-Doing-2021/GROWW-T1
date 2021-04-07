import React, { useEffect, useState } from "react";
import  { Loading } from 'react-simple-chatbot';

function BotAnswer(props) {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [ans, setAns] = useState(null);
  const { steps } = props;
  
  useEffect(() => {
    fetch("http://localhost:8000/faq_steps", {
      // Adding method type
      method: "POST",

      // Adding body or contents to send
      body: JSON.stringify({
        question: steps.botQues.value,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          setAns(result.answer);
          setIsLoaded(true);
          props.triggerNextStep();
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);
 
      
      if(isLoaded)
      {
        
        return(
            <div>{ans}
             
            </div>
        
          )
        

      }
      else
      return <Loading/>
  
  
}

export default BotAnswer;
