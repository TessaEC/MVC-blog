const router = require('express').Router();
const { BlogPost, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.post("/", async (req, res) => {
    try {
     const newBlog = await BlogPost.create(req.body)
     res.json (newBlog)
    }
    catch(err) {
     res.send(err)
    }
   })

router.put("/:id", async (req, res) =>
    BlogPost.update(
        {
            title: req.body.title,
            content: req.body.content
        },
        {
            where: {
              id: req.params.id
            }
        }
    ))

   module.exports = router