#### A simple CRUD (Create, Read, Update, Delete) operation in Node.js with MySQL involves setting up a database connection, executing SQL queries for each operation, and handling responses.

Here are sample CRUD (Create, Read, Update, Delete) operations using Node.js with a PostgreSQL database, leveraging the pg library for direct database interaction.

### 1. Setup:
First, install the pg library:

```
npm install pg
```
### 2. Database Connection (db.js):
Create a db.js file to manage your PostgreSQL connection pool.

```
const { Pool } = require('pg');

const pool = new Pool({
    user: 'your_user',
    host: 'localhost',
    database: 'your_database',
    password: 'your_password',
    port: 5432,
});

module.exports = {
    query: (text, params) => pool.query(text, params),
};
```

### 3. CRUD Operations (example.js):
This file demonstrates the CRUD operations on a sample users table. Assume the users table has id (SERIAL PRIMARY KEY), name (VARCHAR), and email (VARCHAR) columns.

```
const db = require('./db');
```
### Create a new user
```
async function createUser(name, email) {
    const query = 'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *';
    const values = [name, email];
    try {
        const res = await db.query(query, values);
        console.log('User created:', res.rows[0]);
        return res.rows[0];
    } catch (err) {
        console.error('Error creating user:', err);
    }
}
```

### Read all users
```
async function getAllUsers() {
    const query = 'SELECT * FROM users';
    try {
        const res = await db.query(query);
        console.log('All users:', res.rows);
        return res.rows;
    } catch (err) {
        console.error('Error fetching users:', err);
    }
}
```

### Read a user by ID
```
async function getUserById(id) {
    const query = 'SELECT * FROM users WHERE id = $1';
    const values = [id];
    try {
        const res = await db.query(query, values);
        console.log('User by ID:', res.rows[0]);
        return res.rows[0];
    } catch (err) {
        console.error('Error fetching user by ID:', err);
    }
}
```
### Update a user
```
async function updateUser(id, name, email) {
    const query = 'UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *';
    const values = [name, email, id];
    try {
        const res = await db.query(query, values);
        console.log('User updated:', res.rows[0]);
        return res.rows[0];
    } catch (err) {
        console.error('Error updating user:', err);
    }
}
```

### Delete a user

```
async function deleteUser(id) {
    const query = 'DELETE FROM users WHERE id = $1 RETURNING *';
    const values = [id];
    try {
        const res = await db.query(query, values);
        console.log('User deleted:', res.rows[0]);
        return res.rows[0];
    } catch (err) {
        console.error('Error deleting user:', err);
    }
}
```

### Example usage:
```
async function runCrudOperations() {
    await createUser('John Doe', 'john.doe@example.com');
    await getAllUsers();
    await updateUser(1, 'Jane Doe', 'jane.doe@example.com'); // Assuming ID 1 exists
    await getUserById(1);
    await deleteUser(1); // Assuming ID 1 exists
    await getAllUsers(); // Verify deletion
}
```
runCrudOperations();