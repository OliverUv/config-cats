/// <reference path="../typings/index.d.ts" />

import * as fs from 'fs';
import * as _ from 'lodash';
import * as path from 'path';

import {load} from '.';

const ENV_VAR = 'EXAMPLE_CONFIG';
const EXAMPLE_CFG_FILENAME = 'cfg_example.json';

export interface AppConfig {
  host:string;
  port:string;
  username:string;
  password:string;
  db_name?:string;
}

let should_print_result = true;

function get_defaults():AppConfig {
  console.log(`Get defaults was called.`);
  should_print_result = true;
  return {
    host: '127.0.0.1',
    port: '666',
    username: 'not_root',
    password: 'OTldRXyJauQevMyXHRGvl6hUE9jTZhrONNYOHV9DuE',
    db_name: 'example',
  };
}

function get(allow_cache = true):AppConfig {
  console.log('\n' + `Get was called. Cache allowed: ${allow_cache}.`);
  let cfg = load<AppConfig>(ENV_VAR, get_defaults, allow_cache);

  if (cfg != null) {
    if (should_print_result) {
      console.log(`Loaded config:` + '\n');
      console.log(cfg);
      should_print_result = false;
    }
    return cfg;
  } else {
    throw 'NOPE.';
  }
}

get();
get();
get();

console.log('\n' + `To get a different config, set your environment variable ${ENV_VAR} to the path of a json file that overrides some or any of the values in the config above. An example json config is provided in src/${EXAMPLE_CFG_FILENAME}. Lets pretend that ${ENV_VAR} points to it now.`);
process.env[ENV_VAR] = path.join(__dirname, '..', 'src', EXAMPLE_CFG_FILENAME);
get(false);
