const Sequelize = require("sequelize");

const sequelize = require("../../util/database");

const Membership = sequelize.define("membership", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  membership: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
    // 0 for 1st type and so on
  },
  membershipExpiryDate: {
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

module.exports = Membership;
