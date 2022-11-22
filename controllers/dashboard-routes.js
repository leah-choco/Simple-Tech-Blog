const router = require("express").Router();
const { User, BlogPost, Comments } = require("../models/");
const withAuth = require("../utils/auth");

//Finding all the existing blog posts
router.get("/", withAuth, async (req, res) => {
  try {
    const blogData = await BlogPost.findAll({
      where: {
        user_id: req.session.user_id,
      },
      attributes: ["id", "title", "body", "user_id"],
      include: [
        {
          model: Comments,
          attributes: ["id", "content", "blogpost_id"],
        },
      ],
    });

    const blogs = blogData.map((blogs) => blogs.get({ plain: true }));

    res.render("homepage-admin", {
      layout: "dashboard",
      blogs,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//Allows the user to edit a single post
router.get("/edit/:id", async (req, res) => {
  try {
    const blogData = await BlogPost.findByPk(req.params.id);

    const edit = blogData.get({ plain: true });

    res.render("editpost", {
      layout: "dashboard",
      ...edit,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
