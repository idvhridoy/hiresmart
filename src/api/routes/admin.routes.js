const { Router } = require('express');
const AdminController = require('../controllers/AdminController');
const { authenticate, authorize } = require('../middlewares/auth.middleware');

const router = Router();

// All admin routes are protected and restricted to admins
router.use(authenticate, authorize('admin'));

router.get('/metrics', AdminController.getMetrics);

module.exports = router;
