'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'Employees',
        'project_id',
        {
          type:Sequelize.INTEGER,
          allowNull:true,
          references:{
            model:'Projects',
            key:'id',
          },
          onUpdate: 'CASCADE',
          onDelete:'SET NULL',
          defaultValue: null,
          after: 'Job_Title'
        }
      )
      ])
  },
      

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('Employees', 'project_id'),
     
    ]);
  }
};
  

