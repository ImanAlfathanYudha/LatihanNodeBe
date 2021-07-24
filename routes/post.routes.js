module.exports = app => {
  const posts = require("../controllers/post.controller.js");

  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/create", posts.createPost);

  //Update a new post
  router.put("/edit/:id", posts.updatePost);

  // Retrieve all Tutorials
  router.get("/", posts.findAll);

  // Retrieve a single Tutorial with id
  router.get("/:id", posts.findPostById);

  // Create a new comment
  router.post("/comment/create", posts.createComment);


  app.use('/api/post', router);
  //Contoh akses ke url: http://localhost:8080/api/post/
};
