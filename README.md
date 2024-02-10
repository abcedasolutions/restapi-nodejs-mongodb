# restapi-nodejs-mongodb
Reto técnico
- Debe tener instalados previamente:
  > Node.Js: https://nodejs.org/en
  > Docker Descktop : https://www.docker.com/products/docker-desktop/
  > Visual Studio Code: https://code.visualstudio.com/
#########################################################################################################################################
# DESPLEGAR EL APIREST EN UN ENTORNO LOCAL
# Paso 1. clonamos el repositorio git con git clone en una carpeta local.
# Paso 2. (instalamos yarn de manera global) npm install --global yarn
-------------------------------------------------------------------------------------------------------------------------------------------
# DESPLEGANDO CONTENEDORES DOCKER Y SERVIDOR DE BASE DE DATOS MONGO EXPRESS
(Usaremos la imagen de docker - mongo desde el portal hub.docker.com)
https://hub.docker.com/_/mongo
https://hub.docker.com/_/mongo-express
la configuración de la imagen de mongo y mongo express se encuentra en el archivo docker-compose.yml en un entorno local
-------------------------------------------------------------------------------------------------------------------------------------------
# Paso 3. Ejecutar el siguiente comando en la consola de Visual Studio Code: docker-compose up -d    (Creará la carpeta data y ejecutara los contenedores configurados en docker-compose.yml, verificar que se este ejecutando Docker Desktop).
# Paso 4. Ejecutar el siguiente comando en la consola de Visual Studio Code: docker ps -a            (sirve para listar los contenedores que estan corriendo)
------------------------------------------------------------------------------------------------------------
# Paso 5. (ejecutamos el servidor configurado en el puerto 3000 con el comando ) yarn dev
# Paso 6. Para ingresar al servidor Mongo Express en el navegador ingresar a la URL: http://localhost:8081/ y colocar las credenciales usuario:root y password:root
#########################################################################################################################################
# CONSUMIENDO APIREST DESDE UN POSTMAN O INSOMNIA:
# Paso 1: Importar el archivo collection_prestamype.json desde Insomnia:
![image](https://github.com/abcedasolutions/restapi-nodejs-mongodb/assets/5560520/bedc1581-b9ca-468a-9921-fed03a6d84dc)
![image](https://github.com/abcedasolutions/restapi-nodejs-mongodb/assets/5560520/a8bebf5e-d77a-4cff-883b-d63496b3731b)
![image](https://github.com/abcedasolutions/restapi-nodejs-mongodb/assets/5560520/baeaa69e-7503-40b8-8477-0586862986e0)


   
