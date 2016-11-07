/// <reference path="../typings/index.d.ts" />
"use strict";
const _1 = require('.');
const ENV_VAR = 'EXAMPLE_CONFIG';
function get_defaults() {
    return {
        host: '127.0.0.1',
        port: '666',
        username: 'not_root',
        password: 'OTldRXyJauQevMyXHRGvl6hUE9jTZhrONNYOHV9DuE',
        db_name: 'example',
    };
}
function get() {
    let cfg = _1.load(ENV_VAR, get_defaults);
    if (cfg != null) {
        console.log(`Loaded config:` + '\n');
        console.log(cfg);
        console.log('\n' + `To get a different config, point your set your environment variable ${ENV_VAR} to the path to a json file that overrides some or any of the values in the config above. An example json config is provided in src/cfg_example.json`);
        return cfg;
    }
    else {
        throw 'NOPE.';
    }
}
get();
//# sourceMappingURL=example.js.map