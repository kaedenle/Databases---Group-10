const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path'); 
const mysql = require('mysql2')

//listen on env var PORT or port 5000        
const PORT = process.env.PORT || 5000;

//set up API
const app = express();
app.set('port', (process.env.PORT || 5000));

app.use(cors());
//parsing json
app.use(bodyParser.json());

// Server static assets if in production
if (process.env.NODE_ENV === 'production') 
{
  // Set static folder
  app.use(express.static('frontend/build'));
  app.get('*', (req, res) => 
 {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  });
}
/*
const connection = mysql.createConnection({
    host: 'ubuntu-s-1vcpu-2gb-nyc1-01',
    user: 'ethan',
    password: 'testing12',
    database: 'survey_project_1'
  });*/

  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Password',
    database: 'test'
  }).promise();
//connection.connect();

var api = require('./api.js');
api.setApp( app, connection );


//configure cors
app.use((req, res, next) => 
{
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, DELETE, OPTIONS'
  );
  next();
});

//listen on PORT (either custom or 5000)
app.listen(PORT, () => 
{
  console.log('Server listening on port ' + PORT);
});

//module.exports = client;