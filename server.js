#!/usr/bin/env node

var spawn = require('child_process').spawn;
var shellParams = require('./helpers/shellParams')

const cwd = process.cwd();

process.chdir(__dirname);

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

child.on('exit', function (data) {
    process.stdout.write('I\'m done!');
});