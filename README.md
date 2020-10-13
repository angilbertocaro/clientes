# Clientes

Sistema de seguimiento y evaluación de prospectos

## Instalación

Clone el repositorio y ejecute los siguientes comandos

```bash
git clone https://github.com/angilbertocaro/clientes.git
cd clientes
npm install
```

## Uso

Dentro de la carpeta raiz se encuentra un Script para la creacion de la base de datos en Mysql con el nombre de ClientesScript.sql
Tambien puede configurarlo con sus propias credenciales modificando el archivo db.config que se encuentra en la carpeta clientes/config/db.config.js

una ves que este en ejecución la base de datos podra correr el comando

```python
npm run start
```

Ahora podra acceder al aplicativo web con la url http://localhost:4000/

## Edición de FrontEnd

El proyecto cuenta en su carpeta /public con una version compilada y productiva de VueJS que trabajan bajo el mismo servidor y puerto, 
pero si se desea trabajar o modificar el codigo del FrontEnd se debe acceder a la carpeta client y ejecutar los siguientes comandos

```bash
cd cliente
npm install
npm run server
```
sera necesario que se acceda a la carpeta acceder al archivo /client/src/vuex.js
y modificar la variable url de tal forma:

```python
export default new Vuex.Store({
  state: {
    url : "http://localhost:4000", // <-- se agrega localhost 
  },
  mutations: {
  }
})
```

es necesaria esta configuracion para que pueda existir comunicacion entre VueJS y NodeJS de esta forma podremos acceder a ambos entornos de desarrollo

Frontend: [http://localhost:8080/](http://localhost:8080/)  <-- Aplicativo Web

Backend: [http://localhost:4000/](http://localhost:4000/) <-- Rest Api

## Entorno Productivo

Tambien encontrara una version productiva montada sobre un droplet de Digitalocean
puede acceder en el siguiente enlace: [http://157.230.5.78:4000/](http://157.230.5.78:4000/) 
