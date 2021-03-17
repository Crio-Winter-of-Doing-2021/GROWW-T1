import React from "react";
import ChatBot from "react-simple-chatbot";
import { ThemeProvider } from "styled-components";
function customChatbot(props) {  const config = {
    width:"400px",
    height: "400px",
    floating: true
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
    userFontColor: "#4c4c4c"
   };
  
  const steps = [
     {
      id: "Greet",
      message: "Hello there, this is Emilia. How may I help you?",
      delay: 5,
      trigger: "info"
     },
     {
      id: "info",
      message: "Before we move ahead could you share your number with us so that we can be in contact with you??",
      
      trigger: '1'
     },
     {
      id: '1',
      user: true,
      validator: (value) => {
        if (isNaN(value)) {
          return 'value should be a number';
        }
        return true;
      },
      trigger: 'last',
    },
    {
      id:'last',
      message: 'Thank you!!',
      end: true
    }

   ];
   const img="https://avatarfiles.alphacoders.com/547/thumb-54759.png";
   
   
  return(
    
    <ThemeProvider theme={theme}>
      
      
    <ChatBot
    speechSynthesis={{ enable: true, lang: 'en' }}
    steps={steps} {...config} botAvatar={img}/>
   
        </ThemeProvider>
    );
   
}export default customChatbot;