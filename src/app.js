require('dotenv').config();
const express = require('express');
const cors    = require('cors');
const helmet  = require('helmet');
const morgan  = require('morgan');
const { swaggerUi, swaggerDoc } = require('./config/swagger');


const app = express();
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.use('/api/v1/auth',    require('./routes/auth'));
app.use('/api/v1/authors', require('./routes/authors'));
app.use('/api/v1/books',   require('./routes/books'));
app.use('/api/v1/borrows', require('./routes/borrows'));
//Swager
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
// Route 404
app.use((req, res) => res.status(404).json({ success: false, message: 'Route introuvable' }));

module.exports = app;