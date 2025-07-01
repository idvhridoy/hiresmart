const { Router } = require('express');
const CandidateController = require('../controllers/CandidateController');
const { applicationLimiter } = require('../../config/rateLimit');
const cache = require('../middlewares/cache.middleware');
const { authenticate, authorize } = require('../middlewares/auth.middleware');

const router = Router();

// All candidate routes are protected and restricted to candidates
router.use(authenticate, authorize('candidate'));

router.get('/jobs', cache(300), CandidateController.getJobs); // Cache for 5 minutes
router.post('/jobs/:id/apply', applicationLimiter, CandidateController.apply);

module.exports = router;
