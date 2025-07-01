const cron = require('node-cron');

const Job = require('./models/Job');
const User = require('./models/User');

// Schedule a task to run every day at midnight to archive old jobs
cron.schedule('0 0 * * *', async () => {
  console.log('Running daily job archival task...');
  try {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const result = await Job.query()
      .patch({ status: 'archived' })
      .where('created_at', '<', thirtyDaysAgo.toISOString())
      .whereIn('status', ['open', 'closed']);

    console.log(`Archived ${result} old job posts.`);
  } catch (error) {
    console.error('Error archiving old jobs:', error);
  }
});

// Schedule a task to run every Sunday at 2 AM to remove unverified users
cron.schedule('0 2 * * 0', async () => {
  console.log('Running weekly unverified user cleanup task...');
  try {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const result = await User.query()
      .delete()
      .where('is_verified', false)
      .where('created_at', '<', sevenDaysAgo.toISOString());

    console.log(`Removed ${result} unverified users.`);
  } catch (error) {
    console.error('Error removing unverified users:', error);
  }
});

console.log('Scheduler initialized.');
