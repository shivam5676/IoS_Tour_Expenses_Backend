'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('voucherExpenses', 'adminApprovedAmountRemark', {
      type: Sequelize.STRING, // Adjust the type as needed
      allowNull: true,        // Change to `false` if the column should be mandatory
      defaultValue: "ok"      // Set a default value if needed
    });
  }
};

