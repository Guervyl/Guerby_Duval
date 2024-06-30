# Esto es una evaluación técnica de conocimientos FULLSTACK .NET

### Es un proyecto Asp.net core 8 con Angular 17

Los objetivos son:
- Diseñe un modelo de datos que contenga información sobre las tareas pendientes. Incluye al menos
los siguientes atributos: ID, Titulo, Descripción, Fecha Creacion, Fecha Vencimiento, Completada. (Code
First EF o DataBase First)
- Configurar una API RESTful para realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) en las
tareas pendientes.
- Implemente la autenticación para permitir a los usuarios iniciar sesión con ASP.NET Identity.

## Variable
### Host del API en Angular
Según el enlace del API, para poder ejecutar el proyecto Angular (client), cambiar en la carpeta `environments`.

### Cors
Si el host del API es diferente del host de Angular (client), cambiar en el `Programs.cs` el enlace del policy `OriginClientePolicy`.
