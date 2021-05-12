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
  return Post;
};