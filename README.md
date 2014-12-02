dependents-tree
===============

Figure out dependents tree for a given NPM package

## Usage

command line:

    dependents-tree <package-name1> <package-name2> ...
    dependents-tree --search=<keyword>

as a submodule:

``` javascript

    var findDependenents = require('dependents-tree');
    findDependenents.lookup(['bittorrent-dht', 'node-ssdp'], function(err, tree) {

		})

    findDependenents.search('bittorrent', function(err, tree) {
        // tree of dependents per module that matches the keyword 'bittorrent'
		})

```

## Result example for query `dependents-tree bittorrent-dht node-ssdp`:
	
``` json

{
	"bittorrent-dht": {
		"itty-bitty-torrent": {},
		"torrent-discovery": {
			"webtorrent": {
				"torrnode": {}
			}
		},
		"torrent-stream": {
			"nesbox-time": {},
			"nw-updater": {},
			"peerflix": {
				"castnow": {},
				"cinebeam": {},
				"ezflix": {},
				"morrent": {},
				"peercast": {},
				"playify": {},
				"torrentcast": {}
			},
			"peerflix-headless": {},
			"peerflix-server": {},
			"peermaps": {},
			"peerwiki": {},
			"tget": {},
			"torrent": {},
			"torrent-blob-store": {},
			"torrent-docker": {},
			"torrent-mount": {},
			"wnp": {}
		},
		"webtorrent": {
			"torrnode": {}
		}
	},
	"node-ssdp": {
		"dial": {
			"chromecast": {
				"hubot-chromecast-youtube": {}
			}
		},
		"huejs": {},
		"lumix": {},
		"node-upnp-client": {},
		"nodecast": {},
		"ssdp-proxy": {},
		"upnpserver": {
			"upnpserver-cli": {}
		},
		"wemo": {
			"meshblu-wemo": {},
			"node-red-node-wemo": {},
			"skynet-wemo": {}
		},
		"wemo-js": {
			"zetta-wemo-driver": {}
		},
		"wemore": {}
	}
}

```