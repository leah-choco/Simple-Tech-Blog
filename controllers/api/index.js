const router = require('express').Router();
const userRoutes = require('./userRoutes');
//Name of new route

router.use('/users', userRoutes);

//Name of new route
router.use('/projects', projectRoutes);

module.exports = router;
