const AdminService = require('../../services/AdminService');

class AdminController {
  async getMetrics(req, res, next) {
    try {
      const metrics = await AdminService.getPlatformMetrics();
      res.status(200).json(metrics);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AdminController();
