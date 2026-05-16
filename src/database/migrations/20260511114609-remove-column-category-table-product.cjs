'use strict';

// !importante que todos os arquivos de migations sejam renomeados para CJS

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
      await queryInterface.removeColumn('products', 'category');
     
  },

  async down (queryInterface) {
    
      await queryInterface.addColumn('products','category_id',{
        type: Sequelize.STRING,
        // !importate que o allowNull esteja em true, para que seje criando novamente e aceite vazio
        allowNull:true,
      });
       }
};
