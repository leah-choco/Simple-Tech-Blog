const router = require("express").Router();
const userRoutes = require("./user-routes.js");
const commentRoutes = require("./comment-routes");
const blogRoutes = require("./blog-routes");

router.use("/user", userRoutes);
router.use("/blog", blogRoutes);
router.use("/comment", commentRoutes);

module.exports = router;
