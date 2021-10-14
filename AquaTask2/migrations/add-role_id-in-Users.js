'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'Users',
        'role_id',
        {
          type:Sequelize.INTEGER,
          allowNull:true,
          references:{
            model:'Roles',
            key:'id'
          },
          onUpdate: 'CASCADE',
          onDelete:'SET NULL',
          defaultValue: null,
          after: 'Password'
        }
      )
          ])
      },
         

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('User', 'role_id'),
     
    ]);
  }
};
