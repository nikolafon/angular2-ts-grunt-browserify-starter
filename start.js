var liveServer = require("live-server");
var http = require('http'),
    mockserver = require('mockserver');

http.createServer(mockserver('./mockserver/mocks')).listen('9001');

var params = {
    port: 9000, // Set the server port. Defaults to 8080.
    host: "localhost", // Set the address to bind to. Defaults to 0.0.0.0.
    root: "build", // Set root directory that's being server. Defaults to cwd.
    open: true, // When false, it won't load your browser by default.
    ignore: 'src,node-modules', // comma-separated string for paths to ignore
    file: "index.html", // When set, serve this file for every 404 (useful for single-page applications)
    wait: 0 // Waits for all changes, before reloading. Defaults to 0 sec.
};
liveServer.start(params);
