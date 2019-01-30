
const Sequelize = require('sequelize');
const mysql = require('mysql');
const model = require('./lib/model');

/* eslint no-param-reassign: 0 */
const Init = (rest, path) => {
  const { db } = rest.utils.require(`${path}/configs`) || {};

  /** 释放 sequelize 和 mysql 出去 */
  rest.Sequelize = Sequelize;
  rest.mysql = mysql;

  /* model 的初始化 */
  rest.utils.model = model(db, path, rest);

  return rest.utils.model;
};

Init.Sequelize = Sequelize;
Init.mysql = mysql;

module.exports = Init;
