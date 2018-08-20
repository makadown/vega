# VEGA
Proyecto de Udemy en ASP .Net Core 2 con Angular basado en el curso de mosh separado en 2 proyectos:

- https://github.com/makadown/vega

- https://github.com/makadown/vega-backend

Desde el 7mo Commit se reinició de cero el proyecto debido a que el contenido del curso se desactualizó, con una combinación de entre que me perdí y que me pareció más saludable separar el proyecto en su respectivo FrontEnd y Backend. No me gustó el concepto que manejaba el template de proyecto Dotnet Core con Angular todo revuelto ahí bien quien sabe como. Guácala! :V

En mi caso, ya tenia inicializado el repositorio. De modo que para crear de cero el proyecto, ejecuté: 

> ng new vega --skip-git


This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.0.8.

## Instalaciones varias

Guiado de (https://www.c-sharpcorner.com/article/how-to-install-jquery-popper-and-bootstrap-in-angular/)

> npm install jquery --save

> npm install popper.js --save

> npm install ngx-bootstrap bootstrap@4.1.1 --save

> npm install @angular/animations@6.1.0 --save

> npm install ngx-toastr --save

> npm install @fortawesome/fontawesome-free

- Opcional para sentry.io (logger)
> npm install raven-js --save


en angular.json agregar :

`"styles": [
  
              "src/styles.css",
              
              "./node_modules/bootstrap/dist/css/bootstrap.min.css",

              "./node_modules/ngx-toastr/toastr.css"

            ],

"scripts": [
  
              "./node_modules/jquery/dist/jquery.min.js",
              
              "./node_modules/popper.js/dist/umd/popper.min.js",
              
              "./node_modules/bootstrap/dist/js/bootstrap.min.js"
            ]`

y en styles.css 

`@import '~bootstrap/dist/css/bootstrap.min.css'`

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help / references

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

Sobre forkJoin en Observables
https://blog.ng-classroom.com/blog/tips/fork-join/

Para saber que onda con observables en angular 6
https://stackoverflow.com/questions/42376972/best-way-to-import-observable-from-rxjs