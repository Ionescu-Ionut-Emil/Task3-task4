const db = require("../models");
const Projects = db.Projects;

//find all projects
exports.findAllProjects = (req, res) => {
  Projects.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving employees."
      });
    });
};

// Validate request Project
exports.createProject = (req, res) => {
  if (!req.body.Project_name) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create Project
  const proj = {
    Project_name: req.body.Project_name,
    Start_date: req.body.Start_date,
    Planned_end_date: req.body.Planned_end_date,
    Description: req.body.Description,
    Project_code: req.body.Project_code,
  };

  // Save Project
  Projects.create(proj)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the new Project."
      });
    });
};

//putinProjects
exports.updateProjects = (req, res) => {
  const id = req.params.id;

  Projects.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Table was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Project with id=${id}. Maybe Project was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Project with id=" + id
      });
    });
};


 //delete Project
 exports.deleteProject = (req, res) => {
  const id = req.params.id;

  Projects.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Project was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Projects with id=${id}. Maybe Projects was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Projects with id=" + id
      });
    });
};