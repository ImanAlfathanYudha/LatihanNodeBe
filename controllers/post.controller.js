const db = require("../model");
const Post = db.post;
const Comment = db.comment;
const { Op, sequelize, QueryTypes } = require("sequelize");

exports.createPost = (req, res) => {
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

// Find a single POST with an id
exports.findPostById = async (req, res) => {
  const id = req.params.id;
  // const getCommentById = function() {
  // 	 var comments =  db.sequelize.query("SELECT * FROM comments where comments.id_post= :id_post", {
	 //     replacements: { id_post: id },	
	 //     type: db.sequelize.QueryTypes.SELECT, 
	 // 	 model: Comment,
 	//  }).then (data => {
	 //  	return JSON.stringify(data)
	 // })
  // }
  Post.findByPk(id)
    .then(dataPost => {
     db.sequelize.query("SELECT * FROM comments where comments.id_post= :id_post", {
	     replacements: { id_post: id },	
	     type: db.sequelize.QueryTypes.SELECT, 
	 	 model: Comment,
 	 }).then (dataComment => {
	  	res.status(200).send({
	      status:200,
	      data:{
	      	post:dataPost,
	      	comments:dataComment
	      }
    	});
		 }).catch(err => {
	      res.status(500).send({
	      	status:500,
	        message: "Error retrieving comment with id_post=" + id
	      });
	    });
    })
    .catch(err => {
      res.status(500).send({
      	status:500,
        message: "Error retrieving post with id=" + id
      });
    });
};

// Update a Tutorial by the id in the request
exports.updatePost = (req, res) => {
  const id = req.params.id;

  Post.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.status(200).send({
	      status:200,
	      message:`Post with id=${id} successfully edited.`
    });
      } else {
        res.status(500).send({
          status:500,
          message: `Cannot update Post with id=${id}. Maybe Tutorial was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
      	status:500,
        message: "Error updating Tutorial with id=" + id
      });
    });
};

exports.createComment = (req, res) => {
  // Validate request
  console.log("Tes createComment ",req.body)
  if (!req.body.body) {
    res.status(400).send({
      message: "Don't give an empty comment!"
    });
    return;
  }

  const comment= {
    id_post: req.body.id_post,
    body: req.body.body,
  };

  // Save Comment in the database
  Comment.create(comment)
    .then(data => {
      res.status(200).send({
	      status:200,
	      message:"Comment successfully added to DB"
    	});
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the comment."
      });
    });
  
  // db.sequelize.query("INSERT INTO comments (id_post, body)  VALUES ('${comment.id_post}' , '${comment.id_post}')" , {
	 //     type: db.sequelize.QueryTypes.INSERT,
	 //     model: Comment
 	//  }).then (dataComment => {
 	//  	console.log("Tes berhasil dataComment ",dataComment)
	 //   res.status(200).send({
	 //      status:200,
	 //      message:"Comment successfully added to DB"
  //   	});
		//  }).catch(err => {
		//  	console.log("Tes err ",err)
	 //     res.status(500).send({
  //       message:
  //         err.message || "Some error occurred while creating the comment."
  //     });
  // });
};