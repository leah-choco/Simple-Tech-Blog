const router = require('express').Router();
const { BlogPost , User, Comments } = require('../models');
const withAuth = require('../utils/auth');

//Gets any existing blog posts
router.get('/', async (req, res) => {
  try {
    const blogData = await BlogPost.findAll({
      include: [User],
      
    });

    const blogs = blogData.map((blog) => blog.get({ plain: true }));

    res.render('homepage', { 
      blogs, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//Finding a single blog post
router.get('/blog/:id', async (req, res) => {
  try {
    const blogData = await BlogPost.findByPk(req.params.id, {
      include: [
        User,
        {
          model: Comments,
          include: [User],
        },
      ],
    });

    if (blogData) {

     const blog = blogData.get({ plain: true });

     res.render('single-post', {
       ...blog,
       logged_in: req.session.logged_in
     });
    }else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//Getting login page
router.get('/login', withAuth, (req, res) => {
 
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

//Getting signup page
router.get("/signup", (req,res) => {

  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }

  res.render('signup');
})

module.exports = router;
