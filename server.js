// Setup empty JS array to act as endpoint for all routes
projectData = [];

// Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Dependencies */
const bodyParser = require('body-parser');

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

//setup server
const port = 8000;

//Spin up the server
const server = app.listen(port, listening);

// Callback to debug
function listening(){
    console.log(`server running on localhost: ${port}`);
};

//initialize all route with a callback function
app.get('/all', sendData);
 
//callback function to complete GET '/all'
function sendData (req, res) {
    res.send(projectData)
}

// POST route
app.post('/add', addData);

function addData(req, res) {
    projectData.push( req.body );
	console.log( req.body );
	res.send( req.body );
}