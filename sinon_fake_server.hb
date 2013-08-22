/*global require, define*/
define(function () {

    return function (server) {
{{#each log.entries}}    
        server.respondWith({{#request}}
            "{{method}}",   
            "{{{url}}}",{{/request}}
            [{{#response}}
                {{status}}, 
                { {{#each headers}}
                    "{{name}}": "{{value}}"{{^last}},{{/last}}{{/each}}
                },
                {{{content.text}}}
            {{/response}}]
        );
{{/each}}
    };

});
