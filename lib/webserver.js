(function() {
    var bodyParser = require('body-parser');
    var express = require('express');
    var fs = require('fs');
    var favicon = require('serve-favicon');
    var os = require('os');
    var path = require('path');
    var util = require('util');

    var Vault = require('./vault.js');
    Vault.read();

    module.exports = function (config, events) {
        var app = express();

        // Load body parser first
        app.use(bodyParser.json());

        var routesPath = path.join(__dirname, 'routes');
        fs.readdir(routesPath, function(err, files) {
            for(var i in files) {
                var file = files[i];

                var route = require(path.join(routesPath, file));
                route(app);
            }

            app.get('/*', function (req, res) {
                res.send('<!DOCTYPE html><html><head><link rel="icon" type="image/ico" href="https://github.com/botwillacceptanything/botwillacceptanything/blob/master/data/favicon.ico?raw=true"><meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1"><title>Bot Will Accept Anything</title><meta name="author" content="GitHub Commitors"><style type="text/css" media="all">body {margin:0px; padding:0px; background-repeat:no-repeat; background-position:top right; background-color:white; color:black;}#Header {margin:85px 100px 0px 100px; padding:0px;}.Content {margin:0px 100px 50px; padding:20px; color:black; background-color:#eee; border:1px dashed black;}p {font-size:11px; line-height:20px; font-family:verdana, arial, helvetica, sans-serif; margin:0px 0px 12px 0px;}#Content>p {margin:0px;}#Content>p+p {text-indent:30px;}a {color:#09C; font-size:11px; text-decoration:none; font-weight:600; font-family:verdana, arial, helvetica, sans-serif;}a:link {color:#09c;}a:visited {color:#07a;}a:hover{background-color:white;} h1 {color:#333; font:24px/24px verdana, arial, helvetica, sans-serif; font-weight:900;}h2 {color:#333; font:12px verdana, arial, helvetica, sans-serif; font-weight:700; margin:18px 0px 3px 0px;}h3 {color:#666; font-size:11px; font-weight:800; margin:6px 0px 3px 0px;}img {border-width:0px;}img.thumb {margin:10px 1px;}#Copyright {clear:both; padding:50px 0px 100px 0px; text-align:center; font-weight:800; color:#999;}#copyrightText {position:relative; left:-17px;}.first {margin-top:0px; padding-top:0px;}.boxed {border: 1px solid black ;}</style></head><body><h1 id="Header">Bot Will Accept Anything - The project where anything goes, as long as the code allows it </h1><div class="Content"><p align="center">Navigation<br /><a href="/">Main</a> - <a href="/commits/">Recent Commits</a> - <a href="/stdout/">Standard Output</a> - <a href="/statistics/">Statistics</a></p><center><h1>That\'s a 404.</h1><p>We don\'t know what happened, but this page cannot be found.<br /><a href="/">Return to Index Page</a></p></div><center><iframe src="https://ghbtns.com/github-btn.html?user=botwillacceptanything&repo=botwillacceptanything&type=star&count=true&size=large" frameborder="0" scrolling="0" width="160px" height="30px"></iframe></center></body></html>');
                res.status(404);
            });

            var server = app.listen(3000);
        });

        app.use(favicon(__dirname + '/../data/favicon.ico'));
    };
}());
