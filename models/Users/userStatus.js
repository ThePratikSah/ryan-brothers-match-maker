const Sequelize = require("sequelize");

const sequelize = require("../../util/database");

const User = sequelize.define("user", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  isVerified: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  isAuthorized: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  isMobileVerified: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  isProfileComplete: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  resetToken: {
    type: Sequelize.STRING,
  },
  resetTokenExpiryDate: {
    type: Sequelize.DATE,
  },
  userId: {
    type: Sequelize.INTEGER,
    references: {
      model: User,
      key: "id",
    },
    allowNull: false,
  },
});

module.exports = User;
