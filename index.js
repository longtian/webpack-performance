/**
 * Created by yan on 15-12-18.
 */

var influx = require('influx');
var uuid = require('uuid');
var child_process = require('child_process');

var client = influx({
  database: 'db',
  host: 'localhost'
});

//client.query('drop database db; create database db;',done)

function done(err) {
  if (err) {
    console.error(arguments);
  }
}

function WebpackPerformancePlugin() {

}

WebpackPerformancePlugin.prototype.apply = function (compiler) {
  compiler.plugin('done', function (stat) {
    var task_id = uuid.v4();
    var username = child_process.execSync('whoami', {encoding: 'utf-8'}).replace('\n', '');

    var statValues = {
      modules: stat.compilation.modules.length,
      assets: Object.keys(stat.compilation.assets).length,
      duration: stat.endTime - stat.startTime
    };

    client.writePoint('stat', statValues, {
      task: task_id,
      user: username
    }, {}, done);

    stat.compilation.modules.forEach(function (module, i) {
      var values = {
        reasons: module.reasons.length,
        dependencies: module.dependencies.length,
        "profile.factory": module.profile.factory || 0,
        "profile.building": module.profile.building || 0,
        "profile.dependencies": module.profile.dependencies || 0
      };

      client.writePoint('modules', values, {
        task: task_id,
        user: username,
        resource: module.resource,
        rawRequest: module.rawRequest,
        context: module.context
      }, {}, done);

    });

    var assets = stat.compilation.assets;
    for (var assetName in assets) {
      var size = 0;
      if (assets[assetName]._value) {
        size = assets[assetName]._value.length;
      } else {
        size = assets[assetName]._cachedSource.length;
      }
      client.writePoint('asset', {
        size: size
      }, {
        task: task_id,
        user: username,
        name: assetName
      }, {}, done);
    }
  });
};

module.exports = WebpackPerformancePlugin;