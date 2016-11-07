/// <reference path="../typings/index.d.ts" />

import * as fs from 'fs';
import * as _ from 'lodash';

import {load} from '.';

const ENV_VAR = 'EXAMPLE_CONFIG';

export interface AppConfig {
  host:string;
  port:string;
  username:string;
  password:string;
  db_name?:string;
}

function get_defaults():AppConfig {
  return {
    host: '127.0.0.1',
    port: '666',
    username: 'not_root',
    password: 'OTldRXyJauQevMyXHRGvl6hUE9jTZhrONNYOHV9DuE',
    db_name: 'example',
  };
}

function get():AppConfig {
  let cfg = load<AppConfig>(ENV_VAR, get_defaults);

  if (cfg != null) {
    console.log(`Loaded config:` + '\n');
    console.log(cfg);
    console.log('\n' + `To get a different config, point your set your environment variable ${ENV_VAR} to the path to a json file that overrides some or any of the values in the config above. An example json config is provided in src/cfg_example.json`);
    return cfg;
  } else {
    throw 'NOPE.';
  }
}

get();
