const router = require('express').Router();
const Sequelize = require('../config/connection');
const { BlogPost, User, Comment } = require('../models');

// get all blogs and comments for the homepage
router.get('/', (req, res) => {
  console.log('======================');
  BlogPost.findAll({
    attributes: [
      'id',
      'content',
      'title',
    ],
    // when user is logged in view comments from the comment table which is tied to the user table
    include: [
      {
        model: Comment,
        attributes: ['id', 'comment_content', 'user_id'],
        include: {
          model: User,
          attributes: ['username']
        }
      },
      // user from the user table
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then(BlogPostData => {
      const posts = BlogPostData.map(BlogPost => BlogPost.get({ plain: true }));

      console.log(posts);
      res.render('homepage', {
        posts,
        // logged_in: req.session.logged_in,
        // username: req.session.username
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

router.get('/BlogPost/:id', (req, res) => {
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
        attributes: ['id', 'comment_content', 'post_id', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username']
        }
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
        loggedIn: req.session.logged_in,
        username: req.session.username
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;