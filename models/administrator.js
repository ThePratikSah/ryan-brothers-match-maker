const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const Administrator = sequelize.define("administrator", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  resetToken: {
    type: Sequelize.STRING,
  },
  resetTokenExpiryDate: {
    type: Sequelize.DATE,
  },
});

module.exports = Administrator;
