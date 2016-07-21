#!/usr/bin/env node

import { cp, rm } from 'shelljs';

cp(
    'package.json',
    'README.md',
    'config-sample.js',
    'dist/npm/.'
);
rm('dist/npm/config.js');
