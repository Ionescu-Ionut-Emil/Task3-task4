module.exports = (sequelize,DataTypes) =>{
    const Roles= sequelize.define("Roles",{
      
    Name:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            notEmpty:true
        }
    },

});


Roles.associate = function(models){
    Roles.hasOne(models.Users,{as: 'roles', foreignKey: 'role_id'});
};

return Roles
}