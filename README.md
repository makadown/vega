# VEGA
Proyecto de Udemy en ASP .Net Core 2 con Angular 5
(Adaptado del curso de Mosh)

Creación de proyecto de cero:

- Descargar e instalar apnetcore :
> https://www.microsoft.com/net/learn/get-started/windows

En caso de no tenerlo, crear la variable de entorno:
> SET ASPNETCORE_Environment=Development

- Instalar yeoman con template de apnetcore + angular
> npm install -g yo generator-aspnetcore-spa (deprecated)
  ahora es:
> npm install -g yo dotnet new angular

- Correr este comando en directorio donde se encontrará el proyecto:
> dotnet new angular
Esto escafoldeará todo el merequetengue. Magia!

- para correr la app (ojo, tarda un chingo)
> dotnet run
Aunque si se puede, no hay necesidad de correr 'ng serve' porque ASP.Net Core se encarga de usarlo internamente. Bueno, eso dice maicrosof (Fuente: https://docs.microsoft.com/en-us/aspnet/core/spa/angular?tabs=netcore-cli&view=aspnetcore-2.1).

Debería aparecer en los mensajes de consola algo que contenga: 
> ** NG Live Development Server is listening on localhost:62593, open your browser on http://localhost:62593/ **

