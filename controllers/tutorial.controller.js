const db = require("../model");
const Tutorial = db.tutorials;
const Op = db.Sequelize.Op;

// Create and Save a new Tutorial
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Tutorial
  const tutorial = {
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false
  };

  // Save Tutorial in the database
  Tutorial.create(tutorial)
    .then(data => {
      res.status(200).send({
	      status:200,
	      message:"Tutorial successfully added to DB"
    });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial."
      });
    });
};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Tutorial.findAll({ where: condition })
    .then(data => {
      res.status(200).send({
      status:200,
      tutorials:data,	
    });
    })
    .catch(err => {
      res.status(500).send({
      	status:500,
        message:
          err.message || "Ada error ketika mengambil data tutorial."
      });
    });
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Tutorial.findByPk(id)
    .then(data => {    	
     res.status(200).send({
      status:200,
      tutorial:data,	
    });
    })
    .catch(err => {
      res.status(500).send({
      	status:500,
        message: "Error retrieving Tutorial with id=" + id
      });
    });
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Tutorial.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.status(200).send({
	      status:200,
	      message:`Tutorial with id=${id} successfully edited.`
    });
      } else {
        res.status(500).send({
          status:500,
          message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found or req.body is empty!`
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

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Tutorial.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.status(200).send({
          status:200,
          message: `Tutorial with id=${id} was successfully deleted.`
        });
      } else {
        res.status(500).send({
          status:500,
          message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
      	status:500,
        message: "Could not delete Tutorial with id=" + id
      });
    });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  Tutorial.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Tutorials were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all tutorials."
      });
    });
};

// Find all published Tutorials
exports.findAllPublished = (req, res) => {
  Tutorial.findAll({ where: { published: true } })
    .then(data => {
      res.status(200).send({
      status:200,
      tutorial:data,	
    });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};

exports.publishTutorial = (req, res) => {
  const id = req.params.id;

 Tutorial.update({ published: 1 }, {
  where: {
    id: id
	  }
	})
    .then(num => {
      if (num == 1) {
        res.status(200).send({
	      status:200,
	      message:`Tutorial with id=${id} successfully published.`
    });
      } else {
        res.status(500).send({
          status:500,
          message: `Cannot publish Tutorial with id=${id}! Maybe Tutorial was not found or tuorial already published.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
      	status:500,
        message: "Error publishing Tutorial with id=" + id
      });
    });
};

exports.unpublishTutorial = (req, res) => {
  const id = req.params.id;

 Tutorial.update({ published: 0 }, {
  where: {
    id: id
	  }
	})
    .then(num => {
      if (num == 1) {
        res.status(200).send({
	      status:200,
	      message:`Tutorial with id=${id} successfully unpublished.`
    });
      } else {
        res.status(500).send({
          status:500,
          message: `Cannot unpublish Tutorial with id=${id}! Maybe Tutorial was not found or tuorial already unpublished.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
      	status:500,
        message: "Error when unpublishing Tutorial with id=" + id
      });
    });
};