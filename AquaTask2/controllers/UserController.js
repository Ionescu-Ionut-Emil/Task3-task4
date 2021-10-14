const db = require("../models");
const Users = db.Users;
const accessTokenSecret = 'xyz';
const Op = db.Sequelize.Op;
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const Roles = db.Roles;

// Validate request User
exports.createUsers = async (req, res) => {
    if (!req.body.User_name) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
    // Create User
    const user = {
        User_name: req.body.User_name,
        Password: req.body.Password,
        roleId: 2
    };
  
    const salt = await bcrypt.genSalt(10);
    // now we set user password to hashed password
    user.Password = await bcrypt.hash(user.Password, salt);

    // Save User
    Users.create(user)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the new User."
        });
      });
  };

  //delete User
 exports.deleteUser = (req, res) => {
    const id = req.params.id;
    const { role } = req.user;
    if (role !== 'Admin') {
      return res.sendStatus(403);
    }

    Users.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "User was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete User with id=${id}. Maybe User was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete User with id=" + id
        });
      });
  };

//find all users


exports.findAllUsers= (req, res) => {
  const usr = req.params.User_name;
  const id = req.params.id;

  const { role } = req.user;
  if (role !== 'Admin') {
      return res.sendStatus(403);
  }

  Users.findAll({
    attributes: ['id','User_name'],
   include:[
    {
      model:  Roles,
      as: 'roles',
    }
  ]})
    .then(usr => {
      res.send(usr);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving employees."
      });
    });
};

  //hashing password

  

  exports.login = async (req, res) => {
      
    let username = req.body.User_name;
    let password= req.body.Password;
    var condition = { User_name: { [Op.like]: `${username}` }};
    let user = await Users.findOne({
      include:[
       {
         model:  Roles,
         as: 'roles'
       }],
      where: condition 
      });
    
    if(user == null)
    {
      res.status(400).send({
        message: `User not found`
    });
    }
    
    let validPassword = await bcrypt.compare(password, user.Password);
    if (validPassword) {
        // Generate an access token
        const accessToken = jwt.sign({ username: user.User_name, role:user.roles.Name }, accessTokenSecret);

        res.json({
            accessToken
        });
    }
    else{
        res.status(400).send({
            message: `password incorrect`
        });
    }
}; 

