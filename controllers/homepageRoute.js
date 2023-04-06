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
// get login/signup page
router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }
  res.render('login');
});

// get a single blog post and its comments
router.get('/post/:id', (req, res) => {
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
                attributes: ['id', 'content', 'blog_post_id', 'user_id', 'created_at'],
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
                logged_in: req.session.logged_in
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
  });


module.exports = router;