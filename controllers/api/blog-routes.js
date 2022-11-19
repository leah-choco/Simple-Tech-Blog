const router = require("express").Router();
const { BlogPost } = require("../../models/");
const withAuth = require("../../utils/auth");

//Creating a new blog post
router.post("/", withAuth, async (req, res) => {
  try {
    const newPost = await BlogPost.create({
      ...req.body,
      userId: req.session.userId,
    });
    res.status(200).json(newPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Updating an existing blog post
router.put("/:id", withAuth, async (req, res) => {
  try {
    const blogData = await BlogPost.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!blogData[0]) {
      res.status(404).json({ message: `No blog posts found with that id.` });
      return;
    }
    res.status(200).json(blogData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Deleting existing blog post
router.delete("/:id", async (req, res) => {
  try {
    const blogData = await BlogPost.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!blogData) {
      res.status(400).json({ message: "No blog posts found with that id" });
      return;
    }
    res.status(200).json(blogData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
