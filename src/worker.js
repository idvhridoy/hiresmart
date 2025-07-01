require('dotenv').config();
require('./config/database'); // Initialize database connection

const { jobMatchingQueue } = require('./config/queue');
const processJobMatching = require('./jobs/JobMatchingProcessor');

// Process jobs from the queue
jobMatchingQueue.process(processJobMatching);

console.log('Worker is running and listening for jobs...');
