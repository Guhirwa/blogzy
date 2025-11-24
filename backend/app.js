const _dotenv = require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');

const app = express();

connectDB()
    .then(result => {
        console.log('Database connected successfully');
        app.listen(process.env.PORT, () => {
            console.log(`Server running on port ${process.env.PORT}`);
        })
    })
    .catch(error => console.log('Database connection failed', error));

app.use(helmet());
app.use(cors());
app.use(morgan('dev'));

