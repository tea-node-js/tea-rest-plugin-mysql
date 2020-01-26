const Sequelize = require('sequelize');
const _ = require('lodash');

/* eslint no-param-reassign: 0 */
/* 定义一个函数，为了避免 eslint airbnb 的冲突 */
Sequelize.DataTypes.type = (paths, len) => {
  const fn = _.get(Sequelize, paths.toUpperCase());
  if (!fn) throw Error(`Sequelize types non-exists: ${paths}`);
  return len == null ? fn : fn(len);
};

/**
 * 初始化 models
 * params
 *   sequelize Sequelize 的实例
 *   path models的存放路径
 */
module.exports = (opt, path, rest) => {
  const { utils } = rest;

  /* 存放 models 的定义, 方便随时取出 */
  let Models = {};

  const defineModel = (sequelize) => {
    const models = utils.getModules(`${path}/models`, ['coffee', 'js'], ['index', 'base']);
    _.each(models, (v, k) => {
      Models[k] = Models[k] || v(sequelize, Sequelize.DataTypes, Sequelize.Op);
    });
  };

  /**
   * model 之间关系的定义
   * 未来代码模块化更好，每个文件尽可能独立
   * 这里按照资源的紧密程度来分别设定资源的结合关系
   * 否则所有的结合关系都写在一起会很乱
   */
  const activeRelations = () => {
    const relations = utils.getModules(`${path}/models/associations`, ['coffee', 'js']);
    _.each(relations, v => v(Models));
  };

  /** 处理 model 定义的 includes, includes 会在查询的时候用到 */
  const activeIncludes = () => {
    _.each(Models, (Model) => {
      if (!Model.includes) return;
      if (_.isArray(Model.includes)) {
        const includes = {};
        _.each(Model.includes, (include) => {
          includes[include] = include;
        });
        Model.includes = includes;
      }
      _.each(Model.includes, (v, as) => {
        const [name, required] = _.isArray(v) ? v : [v, true];
        Model.includes[as] = {
          as,
          required,
          model: Models[name],
        };
      });
    });
  };

  /** 处理 model 定义的 searchCols */
  const searchCols = () => {
    _.each(Models, (Model) => {
      if (Model.searchCols) {
        _.each(Model.searchCols, (v) => {
          if (_.isString(v.match)) v.match = [v.match];
        });
      }
    });
  };

  /**
   * 判断如果是 development 模式下 sync 表结构
   * 同时满足两个条件 development 模式, process.argv 包含 table-sync
   */
  const tableSync = () => {
    if (process.env.NODE_ENV !== 'development') return;
    if (!_.includes(process.argv, 'table-sync')) return;
    _.each(Models, (Model) => {
      Model
        .sync()
        .then(utils.logger.info.bind(utils.logger, 'Synced'))
        .catch(utils.logger.error);
    });
  };

  const init = () => {
    /* 初始化db */
    const sequelize = new Sequelize(opt.name, opt.user, opt.pass, opt);

    /* 强制设置为 0 时区，避免服务器时区差异带来的不一致问题 */
    sequelize.query("SET time_zone='+0:00'").catch(utils.logger.error);

    /* 定义Model */
    defineModel(sequelize);

    /* 激活Model之间的关系 */
    activeRelations();

    /* 处理资源之间的包含，所属关系 */
    activeIncludes();

    /* 处理资源的搜索条件 */
    searchCols();

    /* 同步表结构到数据库中 */
    tableSync();
  };

  if (path && opt) init();

  /**
   * 根据model名称获取model
   */
  const getter = (name) => {
    if (!name) return Models;
    return Models[name];
  };

  const reset = () => {
    Models = {};
  };

  if (!utils.isProd) getter.reset = reset;

  return getter;
};
