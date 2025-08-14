# Full Stack App with NestJS and Angular

This project is a fullstack application. The backend was built using NestJS, which is also able to serve the frontend app. The database was implemented using MySQL. The frontend was built using Angular and the PrimeNG library. A Sakai template for the latter was used as the foundation.

## Requirements

- [NodeJS / npm](https://nodejs.org/es/download)
- [Angular CLI](https://angular.dev/installation)
- [NestJS CLI](https://docs.nestjs.com/)

## Setup a MySQL database

The app requires a MySQL database to connect to. Please set up a MySQL database before proceeding and configure it as you need it.

The app requires a schema named `BDPruebaTecnicaCanopia`, so the SQL script is provided in the `BDPruebaTecnicaCanopia.sql` to allow a quick setup.

Take note of the credentials (`username` and `password`), the `host` and the `port` which will be used to communicate with the database. Make sure that the user can operate the previously mentioned schema; `root` user is set as a default, but it is highly recommended to use a different one in production.

## Setup backend environment variables

The NestJS app requires environment variables to operate correctly. To configure these variables, copy the file `./backend/.env.template` into a new file `./backend/.env`.

```
cp ./backend/.env.template/ ./backend/.env
```

Then, edit the varibles in the `.env` file:

```
nano ./backend/.env

. . .

####### ./backend/.env

DB_USERNAME=root ### Username of the MySQL user that will be used to do operations
DB_PASSWORD=password123 ### Password of the MySQL user that will be used to do operations
DB_NAME=db_name ### Schema name on which the MySQL user will operate
DB_HOST=localhost ### Host on which the MySQL server is located
DB_PORT=3306 ### Port on which the MySQL allows communcation

PORT=3000 ### Port on which the NestJS app will launch

JWT_SECRET=secretKey123 ### Secret key used to sign JWTs for authentication
JWT_EXPIRATION_TIME=5m ### Expiration time of JWT provided by the backend

```

## Setup frontend environment variables

The Angular app requires environment variables to operate correctly. To configure these variables, edit the files `./frontend/src/app/environments/environment.ts` and `./frontend/src/app/environments/environment.development.ts`.

```
nano ./frontend/src/app/environments/environment.ts

. . .

####### ./frontend/src/app/environments/environment.ts

. . .

baseUrl: 'http://localhost:3000/api' ### Base URL to consume the backend API

. . .

nano ./frontend/src/app/environments/environment.development.ts

. . .

####### ./frontend/src/app/environment.developments/environment.ts

. . .

baseUrl: 'http://localhost:3000/api' ### Base URL to consume the backend API

. . .
```

## Start the full app

To start the full app, run the following command:

```
npm run start:full-app
```

## License

This app is MIT licensed.
