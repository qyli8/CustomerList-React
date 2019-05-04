import express from '../../node_modules/express';
import React from 'react';
import ReactDOMServer from 'react-dom/server'
import CustomerService from '../components/CustomerService'
// import CustomerService from '../components/CustomerServiceOld'

const server = express();
server.use(express.static('dist'));
const port = 4242

server.get('/', (req, res) => {
  const initialMarkup = ReactDOMServer.renderToString(<CustomerService />)
  res.send(`<html>
  <head>
    <title>Sample React App</title>
  </head>
  <body>
    <div id="appRoot"></div>
    <div id="mountNode">${initialMarkup}</div>
    <script src="/main.js"></script>
  </body>
</html>`)
});


server.get('/user', (req, res)=>{
  const queryObject = req.query;
  res.send(`hello word ${queryObject.name}`)
});

server.get("/userid/:id", (req, res)=>{
  console.log(req.params)
  const paramsObject =req.params
  res.send(`hello word ${paramsObject.id}`)
});


server.listen(port, () => console.log(`Server is running...on ${port}`));