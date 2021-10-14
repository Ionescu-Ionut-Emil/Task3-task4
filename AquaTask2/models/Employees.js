const Sequelize = require('sequelize');

module.exports = (sequelize,DataTypes) =>{
    const Employees= sequelize.define("Employees",{
      
    Name:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            notEmpty:true
        }
    },

    Adress:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            notEmpty:true
        }
    },
    Email:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            notEmpty:true
        }
    },

    Hire_Date:{
        type:DataTypes.DATE,
        allowNull:false,
        validate:{
            notEmpty:true
        }
    },

    Salary:{
        type:DataTypes.INTEGER,
        allowNull:false,
        validate:{
            notEmpty:true
        }
    },

    Job_Title:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            notEmpty:true
        }
    },
    
    projectId:{
        type:Sequelize.INTEGER,
        field: 'project_id'
    }
    });


    Employees.associate = function(models){
        Employees.belongsTo(models.Projects, {as: 'projects',foreignKey: 'project_id'}) ;
	};

    return Employees
}