this.server = sinon.fakeServer.create();
{{#each log.entries}}
this.server.respondWith({{#request}}
    "{{method}}",   
    "{{url}}",{{/request}}
    [{{#response}}
        "{{status}}", 
        { {{#each headers}}
            "{{name}}": "{{value}}"{{^last}},{{/last}}{{/each}}
        },
        {{{content.text}}}
    {{/response}}]
);
{{/each}}
