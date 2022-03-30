#!/usr/bin/env node

import { spawn } from 'child_process';
import * as shellParams from './helpers/shellParams.mjs';
import * as path from "path";
import { fileURLToPath } from "url";

const cwd = process.cwd();

process.chdir(path.dirname(fileURLToPath(import.meta.url)));

const defaultParametersList = ['start', shellParams.toParameter('cwd', cwd)];
const sentParameters = shellParams.get();
const sentParametersAsList = shellParams.parametersToList(sentParameters);
const parameters = defaultParametersList.concat(sentParametersAsList);

spawn('npm', parameters, { shell: true, stdio: "inherit" });
