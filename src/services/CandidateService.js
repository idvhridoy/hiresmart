const Job = require('../models/Job');
const Application = require('../models/Application');

class CandidateService {
  async getAvailableJobs(filters) {
    const { keyword, location } = filters;
    const query = Job.query()
      .where('status', 'open')
      .withGraphFetched('skills');

    if (keyword) {
      query.where('title', 'ilike', `%${keyword}%`)
           .orWhere('description', 'ilike', `%${keyword}%`);
    }

    if (location) {
      query.where('location', 'ilike', `%${location}%`);
    }

    return query;
  }

  async applyForJob(candidateId, jobId) {
    const job = await Job.query().findById(jobId);
    if (!job || job.status !== 'open') {
      throw new Error('This job is not open for applications.');
    }

    const existingApplication = await Application.query().findOne({
      candidate_id: candidateId,
      job_id: jobId,
    });

    if (existingApplication) {
      throw new Error('You have already applied for this job.');
    }

    return Application.query().insert({
      candidate_id: candidateId,
      job_id: jobId,
    });
  }
}

module.exports = new CandidateService();
