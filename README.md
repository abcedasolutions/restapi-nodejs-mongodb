# Reto técnico restapi-nodejs-mongodb 
- Debe tener instalados previamente:
  > Node.Js: https://nodejs.org/enx
  > 
  > Docker Descktop : https://www.docker.com/products/docker-desktop/
  > 
  > Visual Studio Code: https://code.visualstudio.com/
# DESPLEGAR EL APIREST EN UN ENTORNO LOCAL
>Paso 1. clonamos el repositorio git con git clone en una carpeta local.
>
>Paso 2. Ejecutar los comandos **npm install** y **npm install --global yarn**.
-------------------------------------------------------------------------------------------------------------------------------------------
DESPLEGANDO CONTENEDORES DOCKER Y SERVIDOR DE BASE DE DATOS MONGO EXPRESS
(Usaremos la imagen de docker - mongo desde el portal hub.docker.com)
- Descargar las imagenes en docker desktop:
> https://hub.docker.com/_/mongo
> 
> https://hub.docker.com/_/mongo-express
> 
> la configuración de la imagen de mongo y mongo express se encuentra en el archivo docker-compose.yml en un entorno local
-------------------------------------------------------------------------------------------------------------------------------------------
> Paso 3. Ejecutar el siguiente comando en la consola de Visual Studio Code: **docker-compose up -d**
>
> Creará la carpeta data, el volumen, el contenedor **restapi-nodejs-mongodb** (contenedores **mongo-express-prestamype** y **mongo-prestamype**) y ejecutara los contenedores configurados en docker-compose.yml, verificar que se este ejecutando Docker Desktop).
> 
> Paso 4. Ejecutar el siguiente comando en la consola de Visual Studio Code: **docker ps -a**
> 
> Sirve para listar los contenedores que estan ejecutandose.
>
> ![image](https://github.com/abcedasolutions/restapi-nodejs-mongodb/assets/5560520/2b2d76e6-4c13-4a4d-804f-26fb0ffc54a9)
> 
> Paso 5. Para ingresar al servidor Mongo Express en el navegador ingresar a la URL: http://localhost:8081/ y colocar las credenciales usuario:root y password:root
> ![image](https://github.com/abcedasolutions/restapi-nodejs-mongodb/assets/5560520/418285da-1c81-4e88-b70e-4c6a7ac544e5)
> 
> Paso 6. Ejecutar el comando: **yarn dev**
>
> En el paso 6 se crea la base de datos en el servidor con los esquemas declarados.
> ![image](https://github.com/abcedasolutions/restapi-nodejs-mongodb/assets/5560520/6e09a04d-7a4b-401e-8d96-a8ea17339f38)
> 
> en el paso 6 verificar que en el equipo local el **puerto 3000** este disponible de lo contrario puede forzar el cierre ejecutando el siguiente comando en la terminal: **Stop-Process -Id (Get-NetTCPConnection -LocalPort “3000”).OwningProcess -Force**
> 
# CONSUMIENDO APIREST DESDE UN POSTMAN O INSOMNIA:
>Paso 1: Importar el archivo collection_prestamype.json desde Insomnia:
![image](https://github.com/abcedasolutions/restapi-nodejs-mongodb/assets/5560520/bedc1581-b9ca-468a-9921-fed03a6d84dc)
![image](https://github.com/abcedasolutions/restapi-nodejs-mongodb/assets/5560520/a8bebf5e-d77a-4cff-883b-d63496b3731b)
![image](https://github.com/abcedasolutions/restapi-nodejs-mongodb/assets/5560520/baeaa69e-7503-40b8-8477-0586862986e0)


   
