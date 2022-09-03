const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const Blog = require('./Blog');
const User = require('./User');

class Comment extends Model {}

Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    content: {
      type: DataTypes.TEXT, // string or text
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      // new code
      references: {
        model: User,
        key: 'id'
      }
    },
    blog_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        // new code
        references: {
          model: Blog,
          key: 'id'
        }
      },
  },
  {
    sequelize,
    timestamps: true,
    underscored: true,
    modelName: 'comment',
  }
);

module.exports = Comment;