const router = require('express').Router();
const userRoutes = require('./user-routes.js');
const commentRoutes = require('./comment-routes');
const postRoutes = require('./post-routes');

router.use('/user', userRoutes);
router.use('/post', postRoutes);
router.use('/comment', commentRoutes);

module.exports = router;
