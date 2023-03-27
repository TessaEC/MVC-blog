const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

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
// get all comments
router.get('/', (req, res) => {
    Comment.findAll()
        .then(dbCommentData => res.json(dbCommentData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// get single comment
router.get('/comment', withAuth, async (req, res) => {
    try {
        const commentData = await Comment.findByPk(req.params.id, {
            attributes: ['id', 'content', 'created_at'],
            include: [
                {
                    model: User,
                    attributes: ['username']
                }
            ]
        })
        const comment = commentData.get({ plain: true })
        res.render('comment', {
            ...comment,
            logged_in: true
        })
    }
    catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
  })


module.exports = router;