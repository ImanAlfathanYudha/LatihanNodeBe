module.exports = app => {
  const posts = require("../controllers/post.controller.js");

  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/create", posts.createPost);

  // Retrieve all Tutorials
  router.get("/", posts.findAll);

  // Retrieve a single Tutorial with id
  router.get("/:id", posts.findPostById);

  app.use('/api/post', router);
};
