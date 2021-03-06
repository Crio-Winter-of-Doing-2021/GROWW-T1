import React from "react";
import ChatBot from "react-simple-chatbot";
import { ThemeProvider } from "styled-components";
function customChatbot(props) {  const config = {
    width: "300px",
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
      message: "Hello, Welcome to our shop",
      trigger: "Done"
     },
     {
      id: "Done",
      message: "Have a great day !!",
      end: true
     }
   ];
  
  return(
    <ThemeProvider theme={theme}>
    <ChatBot steps={steps} {...config} />
    </ThemeProvider>
    );
   
}export default customChatbot;