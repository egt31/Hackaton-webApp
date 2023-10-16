const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const mysql = require('mysql');
const bodyParser = require('body-parser');

// Set up EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Use body parsing middleware to handle form data
app.use(bodyParser.urlencoded({ extended: false }));

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

// Serve 'test.html' as the root file
app.get('/', (req, res) => {
    res.render('test');
});

// ... (previous code)

// Define a route for /admin
app.get('/admin', (req, res) => {
    // Query the database to retrieve the data you need
    const query = 'SELECT student_id, first_name, last_name, email, school_id, chosen_service_id, appointment_date, status FROM Students';

    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error querying the database: ' + err.stack);
            // Handle the error, e.g., render an error page
            res.render('error', { error: 'Failed to retrieve data' });
        } else {
            // If successful, pass the data to the EJS template
            const data = {
                students: results
            };
            console.log('Data retrieved from the database:', results); // Add this line for debugging
            res.render('admin', data);
        }
    });
});

// FORM HANDLING
app.post('/submit', (req, res) => {
    const { first_name, last_name, email, chosen_service_id, appointment_date, school_id } = req.body;

    const insertQuery = 'INSERT INTO students (first_name, last_name, email, chosen_service_id, appointment_date, school_id, status) VALUES (?, ?, ?, ?, ?, ?, "Pending")';

    connection.query(insertQuery, [first_name, last_name, email, chosen_service_id, appointment_date, school_id], (err, result) => {
        if (err) {
            console.error('Error inserting data into the database: ' + err.stack);
            res.status(500).send('Error submitting the form');
        } else {
            console.log('Data inserted into the database');
            res.status(200).send('Form submitted successfully');
        }
    });
});

// Update status (admin functionality)
app.post('/update-status', (req, res) => {
    const { student_id, status } = req.body;

    // Call the stored procedure
    connection.query('CALL UpdateStudentStatus(?, ?)', [student_id, status], (err, result) => {
        if (err) {
            console.error('Error calling the stored procedure: ' + err.stack);
            res.status(500).send('Error updating status');
        } else {
            console.log('Status updated in the database');
            res.status(200).send('Status updated successfully');
        }
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
