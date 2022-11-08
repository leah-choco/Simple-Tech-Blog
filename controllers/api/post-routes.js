const router = require('express').Router();
const { BlogPost } = require('../../models/');
const withAuth = require('../../utils/auth');

//Creating a new bog post
router.post('/', withAuth, async (req, res) => {
  const body = req.body;

  try {
    const newPost = await BlogPost.create({ ...body, userId: req.session.userId });
    res.json(newPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Updating an existing blog post
router.put('/:id', withAuth, async (req, res) => {
  try {
    const [affectedRows] = await BlogPost.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (affectedRows > 0) {
      res.status(200).end();
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//Deleting existing blog post
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const [affectedRows] = BlogPost.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (affectedRows > 0) {
      res.status(200).end();
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;