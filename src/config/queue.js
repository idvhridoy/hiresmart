const Queue = require('bull');

const redisConfig = {
  host: process.env.REDIS_HOST || '127.0.0.1',
  port: process.env.REDIS_PORT || 6379,
};

// Create a queue for job matching
const jobMatchingQueue = new Queue('job-matching', { redis: redisConfig });

module.exports = {
  jobMatchingQueue,
};
