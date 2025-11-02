#### A simple CRUD (Create, Read, Update, Delete) operation in Node.js with MySQL involves setting up a database connection, executing SQL queries for each operation, and handling responses.

### 1. Setup:
Install necessary packages.
```
    npm install express mysql body-parser
```
#### Create a MySQL database and table.

```
    CREATE DATABASE myapp_db;
    USE myapp_db;
    CREATE TABLE users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255),
        email VARCHAR(255)
    );
```

#### 2. Database Connection:

Create a db.js file (or similar) to handle the MySQL connection:
JavaScript

```
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'your_mysql_user',
    password: 'your_mysql_password',
    database: 'myapp_db'
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL: ' + err.stack);
        return;
    }
    console.log('Connected to MySQL as id ' + connection.threadId);
});

module.exports = connection;
```

#### 3. Express Application and CRUD Operations:

Create an app.js (or server.js) file for your Express application and define the CRUD routes:

```

const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db'); // Import the database connection

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// CREATE - Add a new user
app.post('/users', (req, res) => {
    const { name, email } = req.body;
    const sql = 'INSERT INTO users (name, email) VALUES (?, ?)';
    db.query(sql, [name, email], (err, result) => {
        if (err) throw err;
        res.status(201).send('User added with ID: ' + result.insertId);
    });
});

// READ - Get all users
app.get('/users', (req, res) => {
    const sql = 'SELECT * FROM users';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// READ - Get a single user by ID
app.get('/users/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM users WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) throw err;
        if (result.length === 0) {
            res.status(404).send('User not found');
        } else {
            res.json(result[0]);
        }
    });
});

// UPDATE - Update a user
app.put('/users/:id', (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;
    const sql = 'UPDATE users SET name = ?, email = ? WHERE id = ?';
    db.query(sql, [name, email, id], (err, result) => {
        if (err) throw err;
        if (result.affectedRows === 0) {
            res.status(404).send('User not found');
        } else {
            res.send('User updated successfully');
        }
    });
});

// DELETE - Delete a user
app.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM users WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) throw err;
        if (result.affectedRows === 0) {
            res.status(404).send('User not found');
        } else {
            res.send('User deleted successfully');
        }
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
```
4. Run the Application:

```
node app.js
```
This setup provides a basic API for performing CRUD operations on a users table in a MySQL database using Node.js and Express. You can test these endpoints using tools like Postman or Insomnia.