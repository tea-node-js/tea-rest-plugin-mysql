const _ = require('lodash');

module.exports = (sequelize, DataTypes) => (
  _.extend(sequelize.define('user', {
    id: {
      type: DataTypes.type('integer.unsigned'),
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.type('string', 30),
      allowNull: false,
      validate: {
        len: [2, 30],
      },
    },
    avatar: {
      type: DataTypes.STRING,
    },
  }), {
    includes: ['team'],
    searchCols: {
      name: {
        op: 'LIKE',
        match: ['{1}%', '%{1}'],
      },
      email: {
        op: 'LIKE',
        match: '%{1}%',
      },
    },
  })
);
