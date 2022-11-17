const router = require('express').Router();
const { BlogPost , User, Comments } = require('../models');
const withAuth = require('../utils/auth');

//Gets any existing blog posts
router.get('/', async (req, res) => {
  try {
   res.render('homepage', {  
      logged_in: req.session.logged_in, 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});



//Getting login page
router.get('/login', (req, res) => {
 
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }
  res.render('login');
});

//Getting signup page
router.get("/signup", (req,res) => {
  if (req.session.logged_in) {
    res.redirect("/dashboard");
    return;
  }

  res.render('signup');
})

module.exports = router;
