dependents-tree
===============

Figure out the dependents tree for a given NPM package - all the packages that depend on a given package, all the packages that depend on those dependents, etc.

## Usage

command line:

    dependents-tree <package-name>

as a submodule:

``` javascript

    var findDependents = require('dependents-tree');
    findDependenents('bittorrent-dht', function(err, tree) {
      // tree is the tree of dependents on 'bittorrent-dht'
    })
```

## Dependents tree example (dependents of bittorrent-dht):

``` json

{
	"itty-bitty-torrent": {},
	"torrent-discovery": {
		"webtorrent": {
			"torrnode": {}
		}
	},
	"torrent-stream": {
		"nw-updater": {},
		"os-torrent-hash": {},
		"peerflix": {
			"castnow": {},
			"cinebeam": {},
			"ezflix": {},
			"morrent": {},
			"peercast": {},
			"torrentcast": {}
		},
		"peerflix-headless": {},
		"peerflix-server": {},
		"peermaps": {},
		"peerwiki": {},
		"tget": {},
		"torrent": {},
		"torrent-blob-store": {},
		"torrent-mount": {},
		"wnp": {}
	},
	"webtorrent": {
		"torrnode": {}
	}
}

```
