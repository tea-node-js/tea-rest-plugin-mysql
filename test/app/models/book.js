const _ = require('lodash');

module.exports = (sequelize, DataTypes) => (
  _.extend(sequelize.define('book', {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2, 30],
      },
    },
    avatar: {
      type: DataTypes.STRING,
    },
  }), {
    searchCols: {
      name: {
        op: 'LIKE',
        match: '%{1}%',
      },
      email: {
        op: 'LIKE',
        match: '%{1}%',
      },
    },
  })
);
