var _ = require("lodash"),
    fs = require("fs"),
    requirejs = require("requirejs"),
    harString = "";

if (process.argv.length !== 3) {
    process.abort();
}


requirejs(["HARParser", "text!sinon_fake_server.hb"], function (harParser, testTemplate) {
   fs.readFile(process.argv[2], function (error, harString) {
        var outputFile = process.argv[2].replace(/hars\/(.*).har/, "mocks/$1.js");
        fs.writeFile(outputFile, harParser.parse(testTemplate, JSON.parse(harString)));
    });

});
