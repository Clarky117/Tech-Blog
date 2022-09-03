const Blog = require("./Blog");
const User = require("./User");
const Comment = require("./Comment");

// define relationships

// user
User.hasMany(Blog, {
    foreignKey: 'user_id'
});

Blog.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'cascade'
});

Comment.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'cascade'
});

Comment.belongsTo(Blog, {
    foreignKey: 'blog_id',
    onDelete: 'cascade'
});

User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: 'cascade'
});

Blog.hasMany(Comment, {
    foreignKey: 'blog_id',
    onDelete: 'cascade'
});

// export
module.exports = {User, Blog, Comment};