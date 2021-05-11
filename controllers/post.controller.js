const db = require("../models");
const Post = db.posts;
const Comment = db.comments;

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

  // Save Tutorial in the database
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

exports.findAll = () => {
  return Post.findAll({
    include: ["comments"],
  }).then((tutorials) => {
    return tutorials;
  });


};

 // .then(data => {
 //      res.status(200).send({
 //      status:200,
 //      tutorials:data,	
 //    });
 //    })
 //    .catch(err => {
 //      res.status(500).send({
 //      	status:500,
 //        message:
 //          err.message || "Ada error ketika mengambil data tutorial."
 //      });
 //    });
