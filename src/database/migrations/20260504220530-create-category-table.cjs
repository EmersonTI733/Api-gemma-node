'use strict';

// !importante que todos os arquivos de migations sejam renomeados para CJS

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
     await queryInterface.createTable('category', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      name_category: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      created_at: {
        type:Sequelize.DATE,
        allowNull:false,
      },
      updated_at: {
        type:Sequelize.DATE,
        allowNull:false,
      },
     });
     
  },

  async down (queryInterface) {
     await queryInterface.dropTable('category');
  }
};
