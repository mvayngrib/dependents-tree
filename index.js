var request = require('request');
var parallel = require('run-parallel');
var qs = require('querystring');

var depsTree = module.exports = {};

depsTree.search = function(query, cb) {
	var self = this;
	var from = '[\"' + query + '\"]';
	var to = '[\"' + query + '\", {}]';

	request('http://registry.npmjs.org/-/_view/byKeyword?' + qs.stringify({
			group_level: 3,
			startkey: from,
			endkey: to,
			skip: 0,
			limit: 1000
	}), function(err, data) {
			data = JSON.parse(data.body);
			self.lookup(data.rows.map(function (row) {
				return row.key[1];
			}), cb);
	});
}

depsTree.lookup = function(pkgNames, cb) {
	var self = this;

	if (!pkgNames instanceof Array)
		pkgNames = [pkgNames];

	var tasks = [];
	var trees = {};
	for (var i = 0; i < pkgNames.length; i++) {
		tasks.push(self._lookupOne.bind(self, pkgNames[i]));
	}

	parallel(tasks, function(err, results) {
		if (err) return console.log('Error: ' + err);
		
		for (var i = 0; i < results.length; i++) {
			trees[pkgNames[i]] = results[i];
		}

		cb(null, trees);
	});
}

depsTree._lookupOne = function(pkgName, cb) {
	if (!pkgName)
		return cb(new Error("Please enter an NPM package name for which to find a dependents"));

	var numRunning = 0;
	var tree = {};
	var seen = {};

	helper(pkgName, tree);

	function helper(_pkgName, _pkgInfo) {
		numRunning++;

		var from = '[\"' + _pkgName + '\"]';
		var to = '[\"' + _pkgName + '\", {}]';

		request('http://registry.npmjs.org/-/_view/dependedUpon?' + qs.stringify({
			group_level: 3,
			startkey: from,
			endkey: to,
			skip: 0,
			limit: 1000
		}), function(err, data) {
			numRunning--;

			if (err) return cb(err);
			
			data = JSON.parse(data.body);
			data.rows.forEach(function (row) {
				var dep = row.key[1];
				if (dep) {
					if (seen[dep])
						_pkgInfo[dep] = seen[dep];
					else {
						_pkgInfo[dep] = seen[dep] = {};
						helper(dep, _pkgInfo[dep]);
					}
				}
			});

			if (!numRunning) cb(null, tree);
		});
	}
}