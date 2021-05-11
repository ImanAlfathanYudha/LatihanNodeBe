module.exports = (sequelize, Sequelize) => {
const Comment = sequelize.define("comment", {
    id_post: {
      type: Sequelize.STRING
    },
    body: {
      type: Sequelize.STRING
    },
    timestamp: {
      type: Sequelize.DATE
    }
 });  
  return Comment;
};
