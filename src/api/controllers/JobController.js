const JobService = require('../../services/JobService');

class JobController {
  async create(req, res, next) {
    try {
      const job = await JobService.createJob(req.user.id, req.body);
      res.status(201).json(job);
    } catch (error) {
      next(error);
    }
  }

  async getMyJobs(req, res, next) {
    try {
      const jobs = await JobService.getEmployerJobs(req.user.id);
      res.status(200).json(jobs);
    } catch (error) {
      next(error);
    }
  }

  async getJob(req, res, next) {
    try {
      const job = await JobService.getJobById(req.params.id, req.user.id);
      res.status(200).json(job);
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const job = await JobService.updateJob(req.params.id, req.user.id, req.body);
      res.status(200).json(job);
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      await JobService.deleteJob(req.params.id, req.user.id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }

  async getApplications(req, res, next) {
    try {
      const applications = await JobService.getApplicationsForJob(req.params.id, req.user.id);
      res.status(200).json(applications);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new JobController();
