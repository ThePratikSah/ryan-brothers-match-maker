const Sequelize = require("sequelize");

const sequelize = require("../../util/database");

const FavouriteProfile = sequelize.define("favouriteProfile", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },

  // access only user's self id
  userSelfId: {
    type: Sequelize.INTEGER,
    references: {
      model: User,
      key: "id",
    },
    allowNull: false,
  },
  favProfileId: {
    type: Sequelize.INTEGER,
    references: {
      model: User,
      key: "id",
    },
  },
});

module.exports = FavouriteProfile;
