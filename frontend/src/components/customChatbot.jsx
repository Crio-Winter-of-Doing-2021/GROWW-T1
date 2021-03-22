import React, { useState, useEffect } from "react";
import ChatBot from "react-simple-chatbot";
import { ThemeProvider } from "styled-components";
function CustomChatbot(props) {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [q1, setQ1] = useState([]);
  const steps = [{
    id: "Greet",
    message: "Hello there, this is Emilia. How may I help you?",
    delay: 5,
    trigger: "question",
  },
  {
    id: "acknowledge",
    message: "Thank you!!",
    end: true
  }];
  
  console.log(props);
  useEffect(() => {
    fetch(props.data)
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result[0].subsections);
          let st=0;
          for (let i = 0; i < result[0].subsections.length; i = i + 1) {
            q1.push({value:i+15321133, label: result[0].subsections[i].type, trigger: "qs"+st });
            st = st + 1;
          }
        
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
  steps.push({id:"question",options:q1});
  for (let i = 0; i < items.length; i = i + 1) {
    let ar=[];
    
   for(let j=0; j<items[i].questions.length;j=j+1)
    {
      ar.push({value:i*10+j,label:items[i].questions[j],trigger:"ans"+i+j});
      
    }
   steps.push({id:"qs"+i,options:ar});
   for(let j=0; j<items[i].questions.length;j=j+1)
    {
      steps.push({id:"ans"+i+j,message:items[i].answers[j],trigger:"Greet"});
      
    }
   

  }
  console.log(steps.length);
  const config = {
    width: "400px",
    height: "400px",
    floating: true,
  };
  const theme = {
    background: "white",
    fontFamily: "Arial, Helvetica, sans-serif",
    headerBgColor: "#212529",
    headerFontColor: "#fff",
    headerFontSize: "25px",
    botBubbleColor: "#212529",
    botFontColor: "#fff",
    userBubbleColor: "#fff",
    userFontColor: "#4c4c4c",
  };
  

  console.log(steps);

  
  console.log(items);
 
  const img = "https://avatarfiles.alphacoders.com/547/thumb-54759.png";

  return (
    <ThemeProvider theme={theme}>
      <ChatBot
        //speechSynthesis={{ enable: true, lang: 'en' }}
        steps={steps}
        {...config}
        botAvatar={img}
      />
    </ThemeProvider>
  );
}
export default CustomChatbot;
