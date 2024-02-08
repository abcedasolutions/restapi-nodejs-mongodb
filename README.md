# restapi-nodejs-mongodb
Reto técnico
1. clonamos el repositorio git con git clone
2. (instalamos yarn de manera global) npm install --global yarn
-----------------------------------------------------------------------------
DOCKER
(descargamos la imagen de docker - mongo desde el portal hub.docker.com)
https://hub.docker.com/_/mongo
https://hub.docker.com/_/mongo-express
la configuración de la imagen de mongo y mongo express se encuentra en el archivo docker-compose.yml en un entorno local
(lanzamos los contenedores con el comando el cual creará la carpeta data y ejecutara los contenedores configurados en docker-compose.yml) 
verificar que se este ejecutando Docker Desktop)

3. docker-compose up -d
(sirve para listar los contenedores que estan corriendo)
4. docker ps -a 
(para apagar los contenedores)
docker-compose down
------------------------------------------------------------------------------------------------------------
5. (ejecutamos el servidor configurado en el puerto 3000 con el comando ) yarn dev
6. en el navegador ingresar a la URL: http://localhost:8081/