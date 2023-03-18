const { Comment } = require('../models');

const commentData = [
    {
        content: 'This is a comment on the first blog post.',
        user_id: 1,
        blog_post_id: 1
    },
    {
        content: 'This is a comment on the second blog post.',
        user_id: 2,
        blog_post_id: 2
    },
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;