const _ = require('lodash');

module.exports = (sequelize, DataTypes) => (
  _.extend(sequelize.define('user', {
    id: {
      type: DataTypes.type('hello.world'),
      primaryKey: true,
      autoIncrement: true,
    },
  }))
);
