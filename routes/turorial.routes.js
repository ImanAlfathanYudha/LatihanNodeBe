module.exports = app => {
  const tutorials = require("../controllers/tutorial.controller.js");

  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/create", tutorials.create);

  // Retrieve all Tutorials
  router.get("/", tutorials.findAll);

  // Retrieve all published Tutorials
  router.get("/published", tutorials.findAllPublished);

  // Retrieve a single Tutorial with id
  router.get("/:id", tutorials.findOne);

  // Update a Tutorial with id
  router.put("/edit/:id", tutorials.update);

  // Delete a Tutorial with id
  router.delete("/delete/:id", tutorials.delete);

  // Delete all Tutorials
  router.delete("/", tutorials.deleteAll);

  //Publish tutorial
  router.put("/publish/:id", tutorials.publishTutorial);

  //Unpublish tutorial
  router.put("/unpublish/:id", tutorials.unpublishTutorial);

  app.use('/api/tutorials', router);
};