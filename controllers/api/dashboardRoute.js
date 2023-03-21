const router = require('express').Router();
const { BlogPost, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// get all posts for dashboard
router.get('/:id', withAuth, (req, res) => {
  BlogPost.findAll({
    where: {
      user_id: req.session.params.id
    },
    attributes: [
      'id',
      'content',
      'title',
      'created_at'
    ],
    include: [
      {
        model: Comment,
        attributes: ['id', 'comment_content', 'blog_post_id', 'user_id', 'created_at'],
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
    .then(dbBlogPostData => {
      const posts = dbBlogPostData.map(post => post.get({ plain: true }));
      res.render('dashboard', { posts, loggedIn: true });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router