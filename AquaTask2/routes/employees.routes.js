module.exports = app => {
    const auth = require('../middleware/aut.js');
    const employees = require("../controllers/controllers.js");
    const projects= require("../controllers/projectController.js")
    const users= require("../controllers/UserController.js")
  
    var router = require("express").Router();
    var router2 = require("express").Router();
    var router3 = require('express').Router();
    var router4 = require('express').Router();

    // route for employees 
    router.post("/", employees.create);
   
    router.get("/all", employees.findAll);

    router.get("/byName", employees.findByName);
  
    router.put("/:id", employees.update)
    
    router.delete("/:id", employees.delete);

    //route for projects
    router2.get("/", projects.findAllProjects);
    
    router2.post("/", projects.createProject);
    
    router2.put("/:id", projects.updateProjects);

    router2.delete("/:id", projects.deleteProject);

    //route for employees with projects
    router.get("/allWithProjects", employees.findAllWithProject);
    router.get("/getByProject/:projectId", employees.findByProjectId);


    //route for users
    router3.delete("/:id", users.deleteUser);
    router3.get("/", users.findAllUsers);


    //route for logIn
    router4.post("/register", users.createUsers);
    router4.post("/",users.login)

    app.use('/api/logIn', router4)
    app.use(auth.authenticateJWT);
    app.use('/api/employees', router)
    app.use('/api/projects', router2)
    app.use('/api/users', router3)
    

}

