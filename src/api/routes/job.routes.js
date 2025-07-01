const { Router } = require('express');
const JobController = require('../controllers/JobController');
const { authenticate, authorize } = require('../middlewares/auth.middleware');
const cache = require('../middlewares/cache.middleware');

const router = Router();

// All job routes are protected and restricted to employers
router.use(authenticate, authorize('employer'));

router.post('/', JobController.create);
router.get('/', JobController.getMyJobs);
router.get('/:id', JobController.getJob);
router.put('/:id', JobController.update);
router.delete('/:id', JobController.delete);
router.get('/:id/applications', cache(600), JobController.getApplications); // Cache for 10 minutes

module.exports = router;
