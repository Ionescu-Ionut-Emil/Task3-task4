const Sequelize = require('sequelize');

module.exports = (sequelize,DataTypes) =>{
    const Users= sequelize.define("Users",{
      
    User_name:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            notEmpty:true
        }
    },
    
    Password:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            notEmpty:true
        }
    },
    roleId:{
        type:Sequelize.INTEGER,
        field: 'role_id'
    }
    });

    Users.associate = function(models){
        Users.belongsTo(models.Roles, {as: 'roles',foreignKey: 'role_id'}) ;
	};




    return Users
}