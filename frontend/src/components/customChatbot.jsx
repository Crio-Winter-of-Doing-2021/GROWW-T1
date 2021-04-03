import React, { useState, useEffect } from "react";
import { Image } from "react-bootstrap";
import ChatBot from "react-simple-chatbot";
import { ThemeProvider } from "styled-components";
import auth from "../auth";
function CustomChatbot(props) {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [steps,setSteps] = useState([]);

  
  console.log(props);
  useEffect(() => {
    const timer = setTimeout(() => fetch(props.data, {
      
      // Adding method type
      method: "POST",
        
      // Adding body or contents to send
      body: JSON.stringify({
          kyc_status: auth.kyc()
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
    }
        
      })
    .then((res) => res.json())
    .then(
      (result) => {
        setIsLoaded(true);
        setSteps(result);
      },
      // Note: it's important to handle errors here
      // instead of a catch() block so that we don't swallow
      // exceptions from actual bugs in components.
      (error) => {
        setIsLoaded(true);
        setError(error);
      }
    ), 1000);
    return () => clearTimeout(timer);
    
    
      
  }, []);
 

  console.log(steps.length);
  const config = {
    width: "350px",
    height: "500px",
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

 
  const img = "https://avatarfiles.alphacoders.com/547/thumb-54759.png";
  if (steps.length === 0) return null;
  else
    return (
      
        <ThemeProvider theme={theme}>
        <ChatBot
          //speechSynthesis={{ enable: true, lang: 'en' }}
          
          enableMobileAutoFocus={true}
          floating={true}
          opened={true}
          steps={steps}
          {...config}
          botAvatar={img}
        />
      </ThemeProvider>

      
      
    );
}

export default CustomChatbot;
