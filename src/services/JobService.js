const Job = require('../models/Job');
const { jobMatchingQueue } = require('../config/queue');

class JobService {
  async createJob(employerId, jobData) {
    const { title, description, location, salary_min, salary_max, skills } = jobData;

    const job = await Job.transaction(async (trx) => {
      const newJob = await Job.query(trx).insert({
        employer_id: employerId,
        title,
        description,
        location,
        salary_min,
        salary_max,
      });

      if (skills && skills.length > 0) {
        // Assuming skills are provided as an array of skill IDs
        await newJob.$relatedQuery('skills', trx).relate(skills);
      }

            // Dispatch a job to the queue for matching
      await jobMatchingQueue.add({ jobId: newJob.id });

      return newJob;
    });

    return job;
  }

  async getEmployerJobs(employerId) {
    return Job.query().where('employer_id', employerId).withGraphFetched('skills');
  }

  async getJobById(jobId, employerId) {
    const job = await Job.query().findById(jobId).withGraphFetched('[skills, employer]');
    if (!job || job.employer_id !== employerId) {
      throw new Error('Job not found or you do not have permission to view it.');
    }
    return job;
  }

  async updateJob(jobId, employerId, updateData) {
    const job = await Job.query().findById(jobId);
    if (!job || job.employer_id !== employerId) {
      throw new Error('Job not found or you do not have permission to update it.');
    }

    const { skills, ...jobDetails } = updateData;

    return Job.transaction(async (trx) => {
      const updatedJob = await Job.query(trx).patchAndFetchById(jobId, jobDetails);

      if (skills) {
        await updatedJob.$relatedQuery('skills', trx).unrelate();
        if (skills.length > 0) {
          await updatedJob.$relatedQuery('skills', trx).relate(skills);
        }
      }

      return updatedJob;
    });
  }

  async deleteJob(jobId, employerId) {
    const job = await Job.query().findById(jobId);
    if (!job || job.employer_id !== employerId) {
      throw new Error('Job not found or you do not have permission to delete it.');
    }

    await Job.query().deleteById(jobId);
    return { message: 'Job deleted successfully' };
  }

    async getApplicationsForJob(jobId, employerId) {
    const job = await Job.query().findById(jobId);
    if (!job || job.employer_id !== employerId) {
      throw new Error('Job not found or you do not have permission to view applications for it.');
    }

    // This assumes an 'applications' relation is defined in the Job model
    return job.$relatedQuery('applications').withGraphFetched('candidate');
  }
}

module.exports = new JobService();
