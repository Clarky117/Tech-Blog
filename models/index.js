const Blog = require("./Blog");
const User = require("./User");
const Comment = require("./Comment");

// define relationships

// user
User.hasMany(Post, {
    foreignKey: 'user_id'
});

User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: 'cascade'
});

// blog
Blog.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'cascade'
});

Blog.hasMany(Comment, {
    foreignKey: 'blog_id',
    onDelete: 'cascade'
});

// comment
Comment.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'cascade'
});

Comment.belongsTo(Blog, {
    foreignKey: 'blog_id',
    onDelete: 'cascade'
});

// export
module.exports = {User, Blog, Comment};