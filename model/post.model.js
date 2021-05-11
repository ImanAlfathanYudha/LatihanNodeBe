module.exports = (sequelize, Sequelize) => {
  const Post = sequelize.define("post", {
    title: {
      type: Sequelize.STRING
    },
    id_user: {
      type: Sequelize.STRING
    },
    body: {
      type: Sequelize.STRING
    },
    timestamp: {
      type: Sequelize.DATE
    }
  });
  

  Post.hasMany(Comment, { as: "comments" });
    Comment.belongsTo(Post, {
      foreignKey: "id_post",
      as: "post",
    });

  return Post;
};