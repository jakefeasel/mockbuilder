define( ["handlebars", "lodash"], 
    function (Handlebars, _) {
        return {
            parse: function (testTemplate, harData) {             
                var compiledTemplate = Handlebars.compile(testTemplate),
                    isXHR = function (e) {
                        console.log(e.request.url + " isXHR? " + _.find(e.request.headers, function (h) {
                            return h.name === "X-Requested-With" && h.value === "XMLHttpRequest";
                        }) || e.request.url.match(/\.less$/))

                        return _.find(e.request.headers, function (h) {
                            return h.name === "X-Requested-With" && h.value === "XMLHttpRequest";
                        }) || e.request.url.match(/\.less$/);
                    },
                    isJSONResponse = function (e) {
                        var contentType = _.find(e.response.headers, function (h) {
                            return h.name === "Content-Type";
                        });

                        return contentType && contentType.value.match(/^application\/json/);
                    },
                    asTextContent = function (e) {
                        // put the response back in JSON so it will be safe to embed in the Javascript directly
                        e.response.content.text = JSON.stringify(e.response.content.text);
                        // add a flag to help with handling trailing commas
                        e.response.headers[e.response.headers.length-1].last = true;

                        e.request.url = e.request.url.replace(/https?:\/\/.*?\//i, '/');
                        return e;
                    };

                harData.log.nonJSONEntries = 
                    _(harData.log.entries)
                        .filter(isXHR)
                        .reject(isJSONResponse)
                        .map(asTextContent)
                        .value();

                harData.log.JSONEntries = 
                    _(harData.log.entries)
                        .filter(isXHR)
                        .filter(isJSONResponse)
                        .map(asTextContent)
                        .value();

                return compiledTemplate(harData);
            }
        };

    }
);