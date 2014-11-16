var request = require('request')
var qs = require('querystring')

module.exports = function(pkgName, cb) {
	if (!pkgName)
		return cb(new Error("Please enter an NPM package name for which to find a dependents"));


	var numRunning = 0;
	var depsTree = {};
	var seen = {};

	helper(pkgName, depsTree);

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

			if (!numRunning) cb(null, depsTree);
		});
	}
}