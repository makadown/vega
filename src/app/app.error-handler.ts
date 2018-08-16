import { ErrorHandler, Inject, NgZone, isDevMode } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import * as Raven from 'raven-js';


export class AppErrorHandler implements ErrorHandler {

    /*
    OJO: Se tiene que hacer aqui la inyeccion debido a que en app.module, todos
         los [providers] se cargan primero que los [imports] (que es donde está el Toastr).

         Entonces, AppErrorHandler se carga primero que el ToastrService, y al entrar por
         acá el ToastrService no se ha inicializado y marca error, es por eso que en este
         preciso escenario se tiene que meter la inyección en el constructor.
    */
    constructor( private ngZone: NgZone,
                  @Inject(ToastrService) private toastr: ToastrService) {
    }

    handleError(error: any): void {
        /* Aqui es muy importante entender el concepto de Zonas de Angular.
        Es una herramienta que nos puede ayudar mucho cuando tengamos que
        ejecutar proceso asíncronos que no requieran de la UI de Angular.
        Referencia:
        https://blog.irontec.com/angular-changedetector-ngzone-y-asyncpipe/
          */
        this.ngZone.run(() => {
                if (!isDevMode()) {
                     Raven.captureException(error.originalError || error);
                }
                this.toastr.error('An unexpected error happened', 'Error');
            });
    }

}
