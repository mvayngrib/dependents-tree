#!/usr/bin/env node

var depTree = require('./');

depTree(process.argv[2], function(err, tree) {
	if (err) console.log(err.message);
	else console.log(JSON.stringify(tree, null, '\t'));
});