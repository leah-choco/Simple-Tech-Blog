const router = require("express").Router();
const { BlogPost, Comments } = require("../../models/");
const withAuth = require("../../utils/auth");

//Creating a new blog post
router.post("/", withAuth, async (req, res) => {
  try {
    const newBlog = await BlogPost.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    res.status(200).json(newBlog);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/dashboard");
    return;
  }
  res.render("login");
});

//Getting the blog post the user wants to edit
router.get("/edit/:id", async (req, res) => {
  try {
    const blogsData = await BlogPost.findByPk(req.params.id);

    const edit = blogsData.get({ plain: true });

    res.render("editpost", {
      ...edit,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//Updating an existing blog post
router.put("/:id", withAuth, async (req, res) => {
  try {
    const blogsData = await BlogPost.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!blogsData[0]) {
      res.status(404).json({ message: `No blog posts found with that id.` });
      return;
    }
    res.status(200).json(blogsData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Deleting existing blog post
router.delete("/:id", async (req, res) => {
  try {
    const blogsData = await BlogPost.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!blogsData) {
      res.status(400).json({ message: "No blog posts found with that id" });
      return;
    }
    res.status(200).json(blogsData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
