const mongoose = require('mongoose');
const calculateFines = require('./tasks/FineCalculator'); // Adjust the path

const run = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/yourDatabase', { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to the database.');

    await calculateFines(); // Call the fines calculation function

    console.log('Fine calculation completed.');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error running test:', error);
  }
};

run();
