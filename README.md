# angular-ts-tdd
This package is made with the intent to practice TDD in projects with typescript where the tests execution is usually slow.
Karma alone doesn't allow a dynamic selection of the file/folder to run and that cause a slow execution of the single file/folder. Using `fdescribe` doesn't fix the issue because the server still has to process all the files of the project.
Taking advantage of Webpack tree shaking we can select a file or a small amount of files and be ready for the execution of the tests in a second.

Install
-
To install the package run
`npm install -g angular-ts-tdd`

Angular-TS-TDD works in 2 steps:

* Run the server in the root folder of the application with
`angular-ts-tdd-server tsconfig=ABSOLUTE_PATH_TO_TSCONFIG_FILE`
  * `tsconfig` is the optional path to the tsconfig file, it not provided will default to `tsconfig` at the root of the project.

* Run the file/folder selector with
`angular-ts-tdd-select path=ABSOLUTE_PATH_TO_FILE_OR_DIRECTORY baseTestPath="ABSOLUTE_PATH_TO_BASE_TEST_FILE"`
    * `path` is the path to the file to the unit test or directory containing unit tests that you wish to run. 
    * `baseTestPath` is the optional parameter containing the path to a file that includes any prerequisites before you can run the test (such as loading `core-js`, `zone-js`, `angular test bed`).
  If not provided will recurse up directories to find base.spec.ts file.

Application
-

---
 **@Types**

The package expect the usage of @Types for library typings

---
 **.spec**

The package expect the test files name to have the following structure `ANY_NAME.spec.ts`