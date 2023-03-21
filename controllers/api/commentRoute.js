const router = require('express').Router();
const { BlogPost, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.post("/", withAuth, async (req, res) => {
    try {
     const newComment = await Comment.create(req.body)
     res.json (newComment)
    }
    catch(err) {
     res.send(err)
    }
   });

   module.exports = router