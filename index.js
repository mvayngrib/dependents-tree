var request = require('request')
var qs = require('querystring')
var _pkgName = process.argv[2];
var depsTree = {};
var numRunning = 0;

function deps(pkgName, pkgInfo) {
	numRunning++;

	var from = '[\"' + pkgName + '\"]';
	var to = '[\"' + pkgName + '\", {}]';
	if (!pkgInfo) {
		depsTree[pkgName] = pkgInfo = {};
	}

	request('http://registry.npmjs.org/-/_view/dependedUpon?' + qs.stringify({
		group_level: 3,
		startkey: from,
		endkey: to,
		skip: 0,
		limit: 1000
	}), function(err, data) {
		if (err) return console.log(err);
		
		data = JSON.parse(data.body);
		data.rows.forEach(function (row) {
			if (row.key[1]) {
				var depInfo = pkgInfo[row.key[1]] = {};
				deps(row.key[1], depInfo);
			}
		});

		if (--numRunning == 0)
			console.log(JSON.stringify(depsTree, null, '\t'));
	});
}

deps(_pkgName, depsTree);