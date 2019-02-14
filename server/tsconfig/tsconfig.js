const path = require('path');
const workingRoot = require('../../helpers/workingRoot');
const root = require('../../helpers/root');
const shellParams = require('../../helpers/shellParams');

module.exports = function() {
  const parameters = shellParams.get();
  let typingsFolder;
  if (parameters.typingsDir) {
    const typingsFolderConfig = path.isAbsolute(parameters.typingsDir) ? parameters.typingsDir : path.resolve(workingRoot.getDir(), parameters.typingsDir);
    typingsFolder = path.relative(root(), typingsFolderConfig);
  } else {
    typingsFolder = "./server/placeholderSrc/*.ts";
  }
  const applicationTypeRoot = path.join(workingRoot.getDir(), "node_modules", "@types");

  return {
    "compilerOptions": {
      "target": "es5",
      "module": "commonjs",
      "moduleResolution": "node",
      "alwaysStrict": true,
      "sourceMap": true,
      "emitDecoratorMetadata": true,
      "experimentalDecorators": true,
      "removeComments": true,
      "allowUnreachableCode": false,
      "noImplicitAny": true,
      "noImplicitReturns": true,
      "noFallthroughCasesInSwitch": true,
      "noUnusedParameters": true,
      "noUnusedLocals": true,
      "strictNullChecks": false,
      "typeRoots" : ["./node_modules/@types", applicationTypeRoot],
      "lib": ["es6", "dom", "dom.iterable", "esnext.asynciterable"]
    },
    "include": [
      typingsFolder
    ]
  };
};