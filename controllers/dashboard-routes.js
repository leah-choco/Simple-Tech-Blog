const router = require("express").Router();
const { BlogPost } = require("../models/");
const withAuth = require("../utils/auth");

//Finding all the existing blog posts
router.get("/", withAuth, async (req, res) => {
  try {
    const blogData = await BlogPost.findAll({
      where: {
        user_id: req.session.userId,
      },
    });

    const blogs = blogData.map((post) => post.get({ plain: true }));

    res.render("homepage-admin", {
      layout: "dashboard",
      blogs,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//Getting the card for a new post
router.get("/new", withAuth, (req, res) => {
  res.render("new-post", {
    layout: "dashboard",
  });
});

//Allows the user to edit a single post
router.get("/edit/:id", withAuth, async (req, res) => {
  try {
    const blogData = await BlogPost.findByPk(req.params.id);

    if (blogData) {
      const blog = blogData.get({ plain: true });

      res.render("edit-post", {
        layout: "dashboard",
        blog,
      });
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.redirect("login");
  }
});

module.exports = router;
