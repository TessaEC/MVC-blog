const router = require('express').Router();
const { BlogPost, User } = require('../models');
const withAuth = require('../utils/auth');

// get all posts for logged in user
router.get('/', withAuth, (req, res) => {
  BlogPost.findAll({
    where: {
      user_id: req.session.user_id
    },
    attributes: [
      'id',
      'content',
      'title',
      'created_at'
    ],
    include: [
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then(dbBlogPostData => {
      const posts = dbBlogPostData.map(post => post.get({ plain: true }));
      res.render('dashboard', {
        posts,
        logged_in: true,
        username: req.session.username});
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// create blog post
router.post('/', withAuth, async (req, res) => {
  try {
    const newBlogPost = await BlogPost.create({
      ...req.body,
      user_id: req.session.user_id
    });
    res.status(200).json(newBlogPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router