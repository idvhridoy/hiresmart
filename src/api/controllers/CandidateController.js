const CandidateService = require('../../services/CandidateService');

class CandidateController {
  async getJobs(req, res, next) {
    try {
      const jobs = await CandidateService.getAvailableJobs(req.query);
      res.status(200).json(jobs);
    } catch (error) {
      next(error);
    }
  }

  async apply(req, res, next) {
    try {
      const application = await CandidateService.applyForJob(req.user.id, req.params.id);
      res.status(201).json(application);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new CandidateController();
