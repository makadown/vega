import { ErrorHandler, Inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

export class AppErrorHandler implements ErrorHandler {

    /*
    OJO: Se tiene que hacer aqui la inyeccion debido a que en app.module, todos
         los [providers] se cargan primero que los [imports] (que es donde está el Toastr).

         Entonces, AppErrorHandler se carga primero que el ToastrService, y al entrar por
         acá el ToastrService no se ha inicializado y marca error, es por eso que en este
         preciso escenario se tiene que meter la inyección en el constructor.
    */
    constructor( @Inject(ToastrService) private toastr: ToastrService) { }

    handleError(error: any): void {
            this.toastr.error('An unexpected error happened', 'Error');
    }

}
