'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('categories',[
      {
        name:'Node'
      },
      {
        name:'Java'
      },
      {
        name:'PHP'
      },
      {
        name:'HTML'
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('categories',{},null);
    
  }
};
