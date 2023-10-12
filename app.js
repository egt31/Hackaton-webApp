// EXPRESS WEB-SERVER
const express = require('express');
const app = express();
const port = 3000;

// Import body-parser for form data parsing
const bodyParser = require('body-parser');

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Use body parsing middleware to handle form data
app.use(bodyParser.urlencoded({ extended: false }));

// Serve 'test.html' as the root file
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/test.html');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// NODE AND MYSQL CONNECTION
const mysql = require('mysql');

// Create a MySQL connection
const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'Elijah Tabilas',
    password: 'drowssap',
    database: 'hackaton'
});

// Connect to the database
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database: ' + err.stack);
        return;
    }
    console.log('Connected to the database');
});

// Close the database connection when the Node.js process exits
process.on('exit', () => {
    connection.end();
});

// FORM HANDLING
app.post('/submit', (req, res) => {
    const { first_name, last_name, email, chosen_service_id, appointment_date, studentID } = req.body;

    const insertQuery = 'INSERT INTO students (first_name, last_name, email, chosen_service_id, appointment_date, studentID) VALUES (?, ?, ?, ?, ?, ?)';


    connection.query(insertQuery, [first_name, last_name, email, chosen_service_id, appointment_date, studentID], (err, result) => {
        if (err) {
            console.error('Error inserting data into the database: ' + err.stack);
            res.status(500).send('Error submitting the form');
        } else {
            console.log('Data inserted into the database');
            res.status(200).send('Form submitted successfully');
        }
    });
});


