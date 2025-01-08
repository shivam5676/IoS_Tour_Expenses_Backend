'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Vouchers', 'chatGroup', {
      type: Sequelize.STRING, // Adjust the type as needed
      allowNull: true,        // Change to `false` if the column should be mandatory
      defaultValue: null      // Set a default value if needed
    });
  },

  async down (queryInterface, Sequelize) {
   
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
