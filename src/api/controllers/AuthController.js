const AuthService = require('../../services/AuthService');

class AuthController {
  async register(req, res, next) {
    try {
      const token = await AuthService.register(req.body);
      res.status(201).json({ token });
    } catch (error) {
      next(error);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const token = await AuthService.login(email, password);
      res.status(200).json({ token });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AuthController();
