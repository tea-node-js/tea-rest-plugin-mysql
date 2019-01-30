const rest = require('tea-rest');
const assert = require('assert');
const restPluginMysql = require('../');

/* global describe it */
describe('integrate', () => {
  describe('#inited', () => {
    let model = restPluginMysql(rest, `${__dirname}/app`);

    it('helper init completed', (done) => {
      assert.ok(rest.utils.model instanceof Function);
      assert.ok(rest.utils.model('team'));
      assert.ok(rest.utils.model('user'));
      assert.ok(rest.utils.model('book'));

      assert.ok(model('team'));
      assert.ok(model('user'));
      assert.ok(model('book'));

      assert.ok(rest.Sequelize);
      assert.ok(rest.mysql);
      assert.ok(restPluginMysql.Sequelize);
      assert.ok(restPluginMysql.mysql);

      done();
    });

    it('configs non-exists', (done) => {
      model = restPluginMysql(rest, `${__dirname}`);
      assert.ok(rest.utils.model instanceof Function);
      assert.equal(null, rest.utils.model('team'));
      assert.equal(null, rest.utils.model('user'));
      assert.equal(null, rest.utils.model('book'));

      assert.ok(rest.Sequelize);
      assert.ok(rest.mysql);
      assert.ok(restPluginMysql.Sequelize);
      assert.ok(restPluginMysql.mysql);

      done();
    });
  });

  describe('#model type error', () => {
    it('catch unexception', (done) => {
      assert.throws(() => {
        restPluginMysql(rest, `${__dirname}/model-type-error`);
      }, (error) => {
        assert.ok(error instanceof Error);
        assert.equal('Sequelize types non-exists: hello.world', error.message);
        done();
      });
    });
  });
});
