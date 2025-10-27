// Import required modules
const express = require('express');
const helmet = require('helmet');               // Security headers
const cors = require('cors');                   // Cross-Origin protection
const rateLimit = require('express-rate-limit'); // Prevent brute-force
const morgan = require('morgan');               // Logging

const app = express();

// =============================
// 1️⃣ Built-in Middleware
// =============================
app.use(express.json());                        // Parse JSON input
app.use(express.urlencoded({ extended: true })); // Parse form data

// =============================
// 2️⃣ Security Middleware
// =============================
app.use(helmet());                              // Adds secure HTTP headers
app.use(cors());                                // Allow trusted domains only

// Limit each IP to 100 requests per 15 minutes
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests from this IP, please try again later.'
});
app.use(limiter);

// =============================
// 3️⃣ Logging Middleware
// =============================
app.use(morgan('combined'));                    // Log requests to console

// =============================
// 4️⃣ Routes
// =============================
app.get('/', (req, res) => {
  res.send('Hello, Secure Express App!');
});

// Import external routes
const userRoutes = require('./userRoutes');
app.use('/users', userRoutes);

// =============================
// 5️⃣ Error Handling
// =============================
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Internal Server Error');
});

// =============================
// 6️⃣ Start Server
// =============================
app.listen(3000, () => {
  console.log('✅ Server running on http://localhost:3000');
});
