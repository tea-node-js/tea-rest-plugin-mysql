const _ = require('lodash');

module.exports = (sequelize, DataTypes) => (
  _.extend(sequelize.define('team', {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: [0, 30],
      },
    },
    ownerId: DataTypes.INTEGER.UNSIGNED,
  }), {
    includes: {
      owner: 'user',
      book: ['book', false],
    },
  })
);
