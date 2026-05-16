'use strict';

// !importante que todos os arquivos de migations sejam renomeados para CJS

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
  
     await queryInterface.addColumn('products', 'category_id', {
      // !parametros da cloluna e relacionamento com category
      type: Sequelize.INTEGER,
      references: {
        model: 'category',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
     });
  },

  async down (queryInterface) {
    
     await queryInterface.removeColumn('products', 'category_id');
  }
};
