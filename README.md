# angular-ts-tdd
This package is made with the intent to practice TDD in projects with typescript where the tests execution is usually slow.
Karma alone doesn't allow a dynamic selection of the file/folder to run and that cause a slow execution of the single file/folder. Using `fdescribe` doesn't fix the issue because the server still has to process all the files of the project.
Taking advantage of Webpack tree shaking we can select a file or a small amount of files and be ready for the execution of the tests in a second.

This package works with some configurations of Angular, it requires core-js, zone.js, @angular/core and @angular/platform-browser-dynamic to be installed in the application to be able to initialize the TestBed environment.

Install
-
To install the package run
`npm install -g angular-ts-tdd`

Angular-TS-TDD works in 2 steps:

* Run the server in the root folder of the application with
`angular-ts-tdd-server`

* Run the file/folder selector with
`angular-ts-tdd-select path=ABSOLUTE_PATH_TO_FILE_OR_DIRECTORY`

Options
-
 **Typings**

In case the application has a typings folder it can be specified during the launch of the server adding the *typingsDir* parameter:

 `angular-ts-tdd-server typingsDir="PATH_TO_TYPINGS_DIRECTORY"`

The path can be either absolute or relative to the application root folder.

Application
-

 **node_modules**

The package expect the node_modules folder to be in the root folder of the application

---
 **@Types**

The package expect the usage of @Types for library typings

---
 **.spec**

The package expect the test files name to have the following structure `ANY_NAME.spec.ts`