const User = require('../models/User');
const Job = require('../models/Job');
const Application = require('../models/Application');

class AdminService {
  async getPlatformMetrics() {
    const userCounts = await User.query()
      .count('id as count')
      .select('role')
      .groupBy('role');

    const totalJobs = await Job.query().count('id as count').first();
    const totalApplications = await Application.query().count('id as count').first();

    const metrics = {
      users: {
        total: userCounts.reduce((acc, curr) => acc + parseInt(curr.count, 10), 0),
        roles: userCounts.reduce((acc, curr) => ({ ...acc, [curr.role]: parseInt(curr.count, 10) }), {}),
      },
      jobs: {
        total: parseInt(totalJobs.count, 10),
      },
      applications: {
        total: parseInt(totalApplications.count, 10),
      },
    };

    return metrics;
  }
}

module.exports = new AdminService();
