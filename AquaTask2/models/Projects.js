module.exports = (sequelize,DataTypes) =>{
    const Projects= sequelize.define("Projects",{
      
    Project_name:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            notEmpty:true
        }
    },

    Start_date:{
        type:DataTypes.DATE,
        allowNull:false,
        validate:{
            notEmpty:true
        }
    },
    Planned_end_date:{
        type:DataTypes.DATE,
        allowNull:false,
        validate:{
            notEmpty:true
        }
    },

    
    Description:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            notEmpty:true
        }
    },

    Project_code:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            notEmpty:true
        }
    },

});

    Projects.associate = function(models){
        Projects.hasOne(models.Employees,{as: 'projects', foreignKey: 'project_id'});
	};

    return Projects
}