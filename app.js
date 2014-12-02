#!/usr/bin/env node

var parseArgs = require('minimist');
var depsTree = require('./');

function cb(err, tree) {
  if (err) console.log(err.message);
  else console.log(JSON.stringify(tree, null, '\t'));
}

var args = parseArgs(process.argv);
if (args.search)
  depsTree.search(args.search, cb);
else if (args.lookup)
  depsTree.lookup(args.lookup.split(','), cb);
else
  depsTree.lookup(process.argv.slice(2), cb);
