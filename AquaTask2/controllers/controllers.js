//const employees = require("../models/Employees");
const db = require("../models");
const Projects = db.Projects;
const Employees = db.Employees;
const Op = db.Sequelize.Op;



    // Validate request
    exports.create = (req, res) => {
    if (!req.body.Name) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
  
    // Create 
    const emp = {
      Name: req.body.Name,
      Adress: req.body.Adress,
      Email: req.body.Email,
      Hire_Date: req.body.Hire_Date,
      Salary: req.body.Salary,
      Job_Title: req.body.Job_Title,
      projectId:req.body.project_id,
    };
  
    // Save 
    Employees.create(emp)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the new Employee."
        });
      });
  };


//Get All
exports.findAll = (req, res) => {
  Employees.findAll()
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


  //Get by Name
  exports.findByName = (req, res) => {
    const empl = req.body.Name;
    var condition = empl ? { Name: { [Op.like]: `%${empl}%` } } : null;
  
    Employees.findOne({where: condition })
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


//Update Employee
  exports.update = (req, res) => {
    const id = req.params.id;
  
    Employees.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Table was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Employee with id=${id}. Maybe Employee was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Employee with id=" + id
        });
      });
  };

  //delete EMPLOYEE
 exports.delete = (req, res) => {
  const id = req.params.id;

  Employees.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Employee was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Employee with id=${id}. Maybe Employee was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Employee with id=" + id
      });
    });
};

//Get All with project
exports.findAllWithProject = (req, res) => {
  Employees.findAll({
    include:[
      {
        model:  Projects,
        as: 'projects',
      }
    ]
  })
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

//Get by project id
exports.findByProjectId = (req, res) => {
  const empl = req.params.projectId;
  var condition = empl ? { project_id: { [Op.like]: `%${empl}%` } } : null;

  Employees.findAll(
    {
      include:[
        {
          model:  Projects,
          as: 'projects',
        }
      ],
      where: condition 
    })
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