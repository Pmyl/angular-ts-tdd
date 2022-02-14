#!/usr/bin/env node

import { spawn } from 'child_process';
import * as shellParams from './helpers/shellParams.mjs';
import * as path from "path";
import {fileURLToPath} from "url";

const cwd = process.cwd();

process.chdir(path.dirname(fileURLToPath(import.meta.url)));

const defaultParametersList = ['start', shellParams.toParameter('cwd', cwd)];
const sentParameters = shellParams.get();
const sentParametersAsList = shellParams.parametersToList(sentParameters);
const parameters = defaultParametersList.concat(sentParametersAsList);

var child = spawn('npm', parameters, { shell: true });

child.stdout.on('data', function (data) {
    process.stdout.write(data);
});

child.stderr.on('data', function (data) {
    process.stdout.write(data);
});

child.on('exit', function () {
    process.stdout.write('I\'m done!');
});