const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');
const app = express();
const port = 3001;


// PostgreSQL database connection

const pool = new Pool({
    user: 'sudheer',
    host: 'localhost',
    database: 'loginsignup',
    password: '@Sudheer123',
    port: 5432,
});

app.use(cors());

app.use(bodyParser.json());

 

// Signup route

app.post('/signup', async (req, res) => {
    const { name, email, password, dob, designation} = req.body;

    try {
        const result = await pool.query(
            'INSERT INTO users (name, email, password, dob, designation ) VALUES ($1, $2, $3, $4, $5) RETURNING id',
            [name, email, password, dob, designation ]
        );

        res.status(201).json({ id: result.rows[0].id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while signing up' });
    }
});
app.get('/profile/:email', async (req, res) => {
    const { email } = req.params
      try {
          const result = await pool.query(
            'SELECT * FROM users WHERE email = $1',
            [email]
          );
          res.status(200).json({ id: result.rows[0].id, name: result.rows[0].name, email: result.rows[0].email, dob: result.rows[0].dob, designation:result.rows[0].designation});
        } catch (error) {
          console.error('Error updating profile:', error);
          res.status(500).json({ error: 'An error occurred while updating the profile' });
        }

      });


// Signup route
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const result = await pool.query('SELECT * FROM users WHERE email = $1 AND password = $2', [
            email,
            password,
        ]);

        if (result.rows.length === 1) {
            res.status(200).json({ email: result.rows[0].email, name: result.rows[0].name });
        } else {
            res.status(401).json({ error: 'Invalid email or password' });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while logging in' });
    }
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});