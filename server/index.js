// Import required modules
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

// Initialize Express app
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb+srv://user123:sX1WsbYrcS8eaBcK@cluster0.51384.mongodb.net/form?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("DB Connetion Successfull");
})
.catch((err) => {
  console.log(err.message);
});

const formDataSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  dob: Date,
  permAddress: String,
  fileName1: String,
  fileType1: String,
  fileName2: String,
  fileType2: String,
  file1: Buffer,
  file2: Buffer
});

const FormData = mongoose.model('FormData', formDataSchema);


// Define API endpoints
app.post('/api/formdata', async (req, res) => {
  try {
    const formData = req.body;
    console.log(formData);
    const newFormData = new FormData(formData);
    await newFormData.save();
    res.status(201).json({ message: 'Form data saved successfully' });
    console.log("Form data saved successfully")
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
