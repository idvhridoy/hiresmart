const { Router } = require('express');
const authRoutes = require('./auth.routes');
const jobRoutes = require('./job.routes');
const candidateRoutes = require('./candidate.routes');
const adminRoutes = require('./admin.routes');

const router = Router();

router.use('/auth', authRoutes);
router.use('/jobs', jobRoutes);
router.use('/candidate', candidateRoutes);
router.use('/admin', adminRoutes);

module.exports = router;
