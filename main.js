var _ = require("lodash"),
    requirejs = require("requirejs"),
    harString = "";

process.stdin.resume();
process.stdin.setEncoding('utf8');

process.stdin.on('data', function(chunk) {
    harString += chunk;
});


requirejs(["HARParser", "text!sinon_fake_server.hb"], function (harParser, testTemplate) {
    process.stdin.on('end', function() {

        console.log(
            harParser.parse(testTemplate, JSON.parse(harString))
        )

    });

});
