const router = require('express').Router();
const { BlogPost, User } = require('../models');
const withAuth = require('../utils/auth');

// router.get('/', withAuth, (req, res) => {
//   BlogPost.findAll({
//     where: {
//       user_id: req.session.user_id
//     },
//     include: [
//       {
//         model: Comment,
//         include: [
//           {
//             model: User,
//             attributes: ['username']
//           }
//         ]
//       }
//     ]
//   })
//     .then(dbBlogPostData => {
//       const posts = dbBlogPostData.map(post => post.get({ plain: true }));
//       res.render('dashboard', { posts, loggedIn: true });
//     })
//     .catch(err => {
//       console.log(err);
//       res.status(500).json(err);
//     });
// });

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
});



// get a single blog post and its comments
router.get('/:id', (req, res) => {
  BlogPost.findOne({
      where: {
        user_id: req.session.params.id
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

module.exports = router