const router = require('express').Router();
const { BlogPost, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// get all posts for logged in user
router.get('/', withAuth, (req, res) => {
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

//create blog post
router.post('/', withAuth, async (req, res) => {
  try {
      const newPost = await BlogPost.create({
          ...req.body,
          user_id: req.session.user_id,
      })
      res.status(200).json(newPost)
  }
  catch (err) {
      console.log(err)
      res.status(400).json(err)
  }
})
// update blog post
router.put("/:id", withAuth, async (req, res) => {
  try {
      const updatePost = await BlogPost.update(
          {
              title: req.body.title,
              content: req.body.content
          },
          {
              where: {
                  id: req.params.id
              }
          }
      )
      res.status(200).json(updatePost)
  }
  catch (err) {
      console.log(err)
      res.status(400).json(err)
  }
})
// delete blog post
router.delete("/:id", withAuth, async (req, res) => {
  try {
      const deletePost = await BlogPost.destroy({
          where: {
              id: req.params.id
          }
      })
      res.status(200).json(deletePost)
  }
  catch (err) {
      console.log(err)
      res.status(400).json(err)
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
              loggedIn: req.session.logged_in,
              username: req.session.username
          });
      })
      .catch(err => {
          console.log(err);
          res.status(500).json(err);
      });
});
// create new comment
router.post("/:id", withAuth, async (req, res) => {
  try {
   const newComment = await Comment.create({
      ...req.body,
      user_id: req.session.user_id,
      blog_post_id: req.params.id
  })
  res.status(200).json(newComment)
  }
  catch (err) {
      console.log(err)
      res.status(400).json(err)
  }
});
// update comment
router.put('/:id', withAuth, async (req, res) => {
  try {
      // Query the database to get the comment with the specified ID
      const comment = await Comment.findByPk(req.params.id);

      // Verify that the comment belongs to the authenticated user
      if (comment.user_id !== req.user.id) {
          return res.status(401).json({ message: "You are not authorized to update this comment" });
      }
      const updateComment = await comment.update(
          {
              title: req.body.title,
              content: req.body.content
          },
          {
              where: {
                  id: req.params.id

              }
          }
      )
      res.status(200).json(updateComment)
  }
  catch (err) {
      console.log(err)
      res.status(400).json(err)
  }
});
// delete comment
router.delete('/:id', withAuth, async (req, res) => {
  try {
      // Query the database to get the comment with the specified ID
      const comment = await Comment.findByPk(req.params.id);

      // Verify that the comment belongs to the authenticated user
      if (comment.user_id !== req.user.id) {
          return res.status(401).json({ message: "You are not authorized to update this comment" });
      }
      const deleteComment = await comment.destroy({
          where: {
              id: req.params.id
          }
      })
      res.status(200).json(deleteComment)
  }
  catch (err) {
      console.log(err)
      res.status(400).json(err)
  }
});

module.exports = router