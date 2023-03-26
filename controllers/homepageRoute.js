const router = require('express').Router();
const Sequelize = require('../config/connection');
const { BlogPost, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

// get all blogs for the homepage
router.get('/', async (req ,res) => {
  try {
      const blogPostData = await BlogPost.findAll({
          attributes: ['title', 'content', 'created_at', 'id'],
          include: [
              {
                  model: User,
                  attributes: ['username'],
              }
          ]
      })
      // Serialize data so the template can read it
      const posts = blogPostData.map(post => post.get({ plain: true }))
      // Pass serialized data and session flag into template
      res.render('homepage', {
          posts,
          logged_in: req.session.logged_in
      })
  }
  catch (err) {
      console.log(err)
      res.status(500).json(err)
  }
});
// get login page
router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }
  res.render('login');
});

// get dashboard page, use withAuth middleware to prevent access to route if not a user/logged in
router.get('/dashboard', withAuth, async (req ,res) => {
  try {
      const userData = await User.findByPk(req.session.user_id, {
          attributes: { exclude: ['password'] },
          include: [{ model: BlogPost }]
          })
      const user = userData.get({ plain: true })
      res.render('dashboard', {
          ...user,
          logged_in: true
      })
  }
  catch (err) {
      console.log(err)
      res.status(500).json(err)
  }
})
// get a single blog post and its comments
router.get('/:id', (req, res) => {
  BlogPost.findOne({
      where: {
          id: req.params.id
      },
      attributes: [
          'id',
          'content',
          'title',
          'created_at',
      ],
      include: [
          {
              model: Comment,
              include: [{
                  model: User,
                  attributes: ['username']
              }
              ]
          },
          {
              model: User,
              attributes: ['username']
          }
      ]
  })
      .then(BlogPostData => {
          if (!BlogPostData) {
              res.status(404).json({ message: 'Unable to locate a blog with this ID' });
              return;
          }
          // serialize the data
          const post = BlogPostData.get({ plain: true })

          // pass data to template
          res.render('single-post', {
              post,
              loggedIn: req.session.logged_in
          });
      })
      .catch(err => {
          console.log(err);
          res.status(500).json(err);
      });
});

module.exports = router;