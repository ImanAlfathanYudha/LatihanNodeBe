const db = require("../model");
const Post = db.post;
const Comment = db.comment;
const { Op } = require("sequelize");

exports.createPost = (tutorial) => {
  // Validate request
  if (!req.body.title && !req.body.id_user) {
    res.status(400).send({
      message: "Title and user id cannot be empty!"
    });
    return;
  }

  const post = {
    id_user: req.body.id_user2,
    title: req.body.title,
    body: req.body.body,
  };

  // Save Post in the database
  Post.create(post)
    .then(data => {
      res.status(200).send({
	      status:200,
	      message:"Post successfully added to DB"
    	});
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Post."
      });
    });
};

exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Post.findAll({ where: condition })
    .then(data => {
      res.status(200).send({
      status:200,
      data:{
      	post:data,	
      }
    });
    })
    .catch(err => {
      res.status(500).send({
      	status:500,
        message:
          err.message || "Ada error ketika mengambil data post."
      });
    });
};

// Find a single Tutorial with an id
exports.findPostById = (req, res) => {
  const id = req.params.id;

  Post.findByPk(id)
    .then(data => {    	
     res.status(200).send({
      status:200,
      data:{
      	post:data,		
      }
    });
    })
    .catch(err => {
      res.status(500).send({
      	status:500,
        message: "Error retrieving post with id=" + id
      });
    });
};