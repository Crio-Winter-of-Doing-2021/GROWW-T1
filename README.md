# GROWW-T1
Team ID: GROWW-T1 | Team Members: Subhadip Maji &amp; Aishwarya Deb


 The goal of this project was to make a contextual chatbot as a feature for the GROWW website. This was part of our CRIO stage 3 externship.

 ### **Directory Guide**

 * The **Frontend code is kept in `./client/` section**
 * The **admin UI code is kept in  `./admin-client/` section**
 * The **server parts are in `./backend/` and `./chatbot_backend/` section**
 * Frontend is deployed using netlify and backend using heroku
 * API details can found in `./backend/api`


### **Frontend Tech Details:**

* [Create React App](https://reactjs.org/docs/create-a-new-react-app.html#create-react-app) was used for the frontend.
* react-router-dom (for making this multi-page website)
* [React-simple-chatbot](https://lucasbassetti.com.br/react-simple-chatbot/) was used for the chatbot UI
* [react-bootstrap](https://react-bootstrap.github.io/) and [material-ui](https://material-ui.com/) for the UI parts

### **Backend Tech Details:**

* [MongoDB v4.4](https://www.mongodb.com/) for the database
* [Mongoose v5.12.0](https://mongoosejs.com/)
* [Express.js middleware v4.17.1](https://expressjs.com/)
* [Node.js v12.20.1](https://nodejs.org/es/)
* [string-similarity v4.0.4](https://www.npmjs.com/package/string-similarity) based on Dice's coefficient for finding similarity between strings. This npm package was used for string matching to find the question asked by the user in the database. The minimum rating for string matching was kept 0.34.

### **Features:**

* The structure of the chatbot is basically a decision tree system comprising of 2 levels in the page section and 1 level in the products

* Based on the page and product context, the chatbot pops up and the user get questions based on that context

* In the orders section, whenever a person clicks on a particular order the chatbot again pops taking details of that order and giving faqs based on that.

* The admin UI allows the admin to configure questions and  answers of their choice. They can add, edit and delete.

### **Urls:**

* [Dummy website to see the chatbot working](https://groww-chatbot.netlify.app/) based on the Groww website

* [Admin UI](https://custom-chatbot-admin.netlify.app/admin)

