const Sequelize = require("sequelize");

const sequelize = require("../../util/database");

const UserProfile = sequelize.define("userprofile", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  age: {
    type: Sequelize.INTEGER,
  },
  gender: {
    type: Sequelize.INTEGER,
  },
  profileImageUrl: {
    type: Sequelize.STRING,
  },
  mobile: {
    type: Sequelize.INTEGER,
  },
  adhaar: {
    type: Sequelize.INTEGER,
  },
  otp: {
    type: Sequelize.INTEGER,
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

module.exports = UserProfile;
