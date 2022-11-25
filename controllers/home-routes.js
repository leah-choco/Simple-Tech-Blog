const router = require("express").Router();
const { BlogPost, User, Comments } = require("../models");
const withAuth = require("../utils/auth");

//Gets any existing blog posts
router.get("/", async (req, res) => {
  try {
    res.render("homepage", {
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//Get a single post
router.get("/blog/:id", async (req, res) => {
  try {
    const blogsData = await BlogPost.findByPk(req.params.id, {
      include: [
        User,
        {
          model: Comments,
          include: [User],
        },
      ],
    });
    if (blogsData) {
      const blog = blogsData({ plain: true });
      res.render("singlepost", { blog });
    } else {
      res.status(500).json(err);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//Getting login page
router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/dashboard");
    return;
  }
  res.render("login");
});

//Getting signup page
router.get("/signup", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/dashboard");
    return;
  }
  res.render("sign-up");
});

//Get the new blog post form
/*router.get("/blog", (req, res) => {
  if (!req.session.logged_in) {
    res.sendStatus(404);
    return;
  }
  res.render("blog");
});

//Get the edit blog form
router.get("edit/:id", async (req, res) => {
  try {
    const blogsData = await BlogPost.findByPk(req.params.id);

    const blog = blogsData.get({ plain: true });

    res.render("editpost", {
      blog: blog,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});*/

module.exports = router;
