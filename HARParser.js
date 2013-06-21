define( ["handlebars", "lodash"], 
    function (Handlebars, _) {
        return {
            parse: function (testTemplate, harData) {             
                var compiledTemplate = Handlebars.compile(testTemplate);

                harData.log.entries = 
                    _(harData.log.entries)
                        // only care about the XHR requests
                        .filter(function (e) {
                            return _.find(e.request.headers, function (h) {
                                return h.name === "X-Requested-With" && h.value === "XMLHttpRequest";
                            });
                        })
                        .map(function (e) {
                            // put the response back in JSON so it will be safe to embed in the Javascript directly
                            e.response.content.text = JSON.stringify(e.response.content.text);
                            // add a flag to help with handling trailing commas
                            e.response.headers[e.response.headers.length-1].last = true;
                            return e;
                        })
                        .value();

                return compiledTemplate(harData);
            }
        };

    }
);