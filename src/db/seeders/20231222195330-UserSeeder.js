'use strict';
// import bcrypt from 'bcrypt';
const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    await queryInterface.bulkInsert('Users', [
      {
        firstName: 'Naufal',
        lastName: 'Taufiq Ridwan',
        email: 'itsnfl30@gmail.com',
        password: bcrypt.hashSync('12345678', 10),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    // if not empty, delete all data
    await queryInterface.bulkDelete('Users', null, {});
  }
};
