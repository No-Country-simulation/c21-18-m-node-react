# ...[c21-18m-node-react/backend]...

## Contenido

Back-End controlador de usuraio
El proyecto esta realizado en:

- [Node.ts](https://nodejs.org/es/)
- [express.ts](https://expressjs.com/es/)
- [Prisma.ts](https://www.prisma.io/)
- [Claudinary](https://cloudinary.com/)

  **ESTE ES UN SERVIDOR NO VISUAL**

## Programas necesarios

Para poder utilizar el proyecto en localhost en necesario clonarlo y tener algunos programas necesarios:

- [Docker-Desktop](https://www.docker.com/products/docker-desktop/)
- [Nodejs](https://nodejs.org/es/download/) v12.18.0 o Superior.
- IDE de desarrollo de tu comodidad Ej. [VS Code](https://code.visualstudio.com/download)
- [PostMan](https://www.postman.com/downloads/) para puebas de APIS. (Opcional)
- [Git](https://git-scm.com/downloads) para poder gestionar las versiones.

## Como Clonar

Comando para clonar:

```bash
cd existing_folder
git clone [LINK DEL REPOSITORIO]

```

## Instalación

Ya clonado el proyecto es necesario instalar : 
-Crear el archivo .env para poder ingresar con las respectivas credenciales utilizadas en la base de datos y en claudinary(Los datos estan pineados). Template del .env: 
```bash
PORT=3000
PUBLIC_PATH=public

POSTGRES_URL=postgresql:
POSTGRES_USER=
POSTGRES_DB=
POSTGRES_PORT=
POSTGRES_PASSWORD=
  
  
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

-El contenedor de docker con el comando docker-compose up -d (Verificar si estamos en la carpeta raiz del backend c21-18m-node-react/backend/) 
-Instalar las dependenciashttp: 


```bash
npm -i
```

## Run en LocalHost:

- Ejecutar el comando npm run dev

### Rutas
(Para ingresar mascotas se debe crear el refugio )
## Mascotas
Post:
-http://localhost:3000/api/pet/create-pet
Get All Pets:
-http://localhost:3000/api/pet/



## Refugios
Post: 
-http://localhost:3000/api/shelter/create-shelter 
Get all Shelter: 
-http://localhost:3000/api/shelter/ 

## Recomendaciones 
 -Verificar si posees contenedores activos, si es asi bajarlos con el comando docker-compose down(utilizar como super usuario si estas en linux(Especificamente Ubuntu 24.04.1 LTS) -sudo docker-compose down) 
 -No es necesario tener postgresql, ya que este puede interferir con la instalacion del servidor
