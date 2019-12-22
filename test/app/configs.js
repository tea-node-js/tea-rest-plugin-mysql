const { env } = process;

module.exports = {
  db: {
    host: env.TR_HOST || env.TR_MYSQL_HOST || '127.0.0.1',
    port: env.TR_PORT || env.TR_MYSQL_PORT || 3306,
    name: env.TR_NAME || env.TR_MYSQL_NAME || 'tea_rest',
    encode: {
      set: 'utf8',
      collation: 'utf8_general_ci',
    },
    user: env.TR_USER || env.TR_MYSQL_USER || 'root',
    pass: env.TR_PASS || env.TR_MYSQL_PASS || '',
    dialect: 'mysql',
    dialectOptions: {
      supportBigNumbers: true,
      charset: 'utf8mb4',
    },
    logging: false,
    define: {
      underscored: false,
      freezeTableName: true,
      syncOnAssociation: false,
      charset: 'utf8',
      collate: 'utf8_general_ci',
      engine: 'InnoDB',
    },
    syncOnAssociation: true,
    pool: {
      min: 2,
      max: 10,
      idle: 300 * 1000,
    },
  },
};
