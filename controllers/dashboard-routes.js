const router = require('express').Router();
const { BlogPost } = require('../models/');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
  try {
    const blogData = await BlogPost.findAll({
      where: {
        userId: req.session.userId,
      },
    });

    const blogs = blogData.map((post) => post.get({ plain: true }));

    res.render('all-posts-admin', {
      layout: 'dashboard',
      blogs,
    });
  } catch (err) {
    res.redirect('login');
  }
});

router.get('/new', withAuth, (req, res) => {
  res.render('new-post', {
    layout: 'dashboard',
  });
});

router.get('/edit/:id', withAuth, async (req, res) => {
  try {
    const blogData = await BlogPost.findByPk(req.params.id);

    if (blogData) {
      const blog = blogData.get({ plain: true });

      res.render('edit-post', {
        layout: 'dashboard',
        blog,
      });
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.redirect('login');
  }
});

module.exports = router;