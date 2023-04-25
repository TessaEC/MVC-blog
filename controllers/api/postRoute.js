const router = require('express').Router();
const { BlogPost, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// Single-post and its comments
router.get('/:id', async (req, res) => {
    try {
    const BlogPostData = await BlogPost.findOne({
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
            if (!BlogPostData) {
                res.status(404).send('No post found with this id!');
                return;
            }
            // serialize the data
            const post = BlogPostData.get({ plain: true })
  
            // pass data to template
            res.render('single-post', {
                post,
                logged_in: req.session.logged_in
            });
        }
        catch(err) {
            console.log(err);
            res.status(500).json(err);
        }
  });

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
  });

// create new comment
router.post("/:id", withAuth, async (req, res) => {
    try {
        const newComment = await Comment.create({
        content: req.body.comment,
        user_id: req.session.user_id,
        blog_post_id: req.params.id
    })
    console.log("I'm in the comment route!")
    res.status(200).json(newComment)
    }
    catch (err) {
        console.log(err)
        res.status(400).json(err)
    }
  });
  
module.exports = router;