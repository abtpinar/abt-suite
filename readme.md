# Suite Tabacalera

Suite Tabacalera para las Empresa ABT de Tabaco.

### Cómo instalar
1. Se debe tener instalado:
   * PHP 7 (o superior).
   * Composer 1.6.5 (o superior).
   * Laravel 5.6 (o superior).
     * (NOTA: Debe estar activado el módulo "rewrite" de apache. Para activarlo ejecute el siguiente comando:
     ``sudo a2enmod rewrite`` y posteriormente reinicie el servicio de apache. ``sudo service apache2 restart``)
   * NodeJs 8.11 (o superior).
   * NPM 5.6.0 (o superior).
2. Una vez instaladas las herramientas mencionadas, clonamos el 
[repositorio](https://develop.tabacosj.co.cu/suite.git), haciendo en alguna carpeta de 
nuestra elección ``git clone "dirección repositorio"``.
3. Luego, estando en la carpeta raíz del proyecto clonado, hacemos ``composer install``.
4. Ahora vamos a la carpeta donde está el frontend de Angular cuya dirección ./resources/suite-ui (relativo a la carpeta 
raíz del proyecto), y estando ahí instalamos la paquetería de Node relativa al front-end; hacemos ``npm install``.
5. Asegurémonos de tener un archivo .env en la raíz (copiado del .env.example) llenando los datos que ahí se piden,
haciendo especial énfasis a los referentes a la conexión de base de datos y los orígenes CORS permitidos 
(variable CORS_ALLOWED_ORIGINS).
6. Luego migramos la base de datos ``php artisan migrate``.
7. Corremos los seeds para poblar la base de datos ``php artisan db:seed``.
8. Generamos una llave a la aplicación con ``php artisan key:generate``.
9. Generamos una llave para el token de seguridad (jwt) con ``php artisan jwt:secret``.

### Cómo ejecutarlo

##### Backend

Deberemos tener funcionando nuestro servidor de base de datos, y en el archivo 
.env como mencionábamos arriba correctamente configuradas las variables relativas a la conexión de base de datos.

 * Producción:
    * Configurar el virtual host apuntando a la carpeta "public" (relativo a la carpeta raíz del proyecto).

 * Desarrollo:
    * Posicionarse en la carpeta raíz del proyecto y ejecutar el comando ``php artisan serve``. Con esto, la API se 
    publica en [http://localhost:8000](http://localhost:8000).

##### Frontend

Para ejecutar el frontend, nos posicionamos en la carpeta "./resources/suite-ui" (relativo a la carpeta raíz del 
proyecto).

 * Producción:
    * Comprobar las variables que se encuentran en el archivo "./src/environments/environment.prod.ts" 
    (relativo a la carpeta raíz de la aplicación frontend) y que las urls estén acordes a las del virtual host que se
    configuró en la sección "Cómo ejecutarlo" del "Backend.
    * Ejecutar el siguiente comando para compilar los assets en la carpeta "./dist" y mover el archivo "index.html" 
    a la carpeta "./public":
    * ``npm run build-prod`` 

    Al terminar, la aplicación queda publicada en
    la dirección que se configuró el virtual host.
 
 * Desarrollo:
    * Ejecutar el comando ``npm start``. Con esto, la app se publica en [http://localhost:4200](http://localhost:4200).