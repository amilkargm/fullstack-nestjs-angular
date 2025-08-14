# Full Stack App with NestJS and Angular

This project is a fullstack application. The backend was built using NestJS, which is also able to serve the frontend app. The database was implemented using MySQL. The frontend was built using Angular and the PrimeNG library. A Sakai template for the latter was used as the foundation.

## Requirements

- [NodeJS / npm](https://nodejs.org/es/download)
- [Angular CLI](https://angular.dev/installation)
- [NestJS CLI](https://docs.nestjs.com/)

## Setup a MySQL database

The app requires a MySQL database to connect to. Please set up a MySQL database before proceeding and configure it as you need it.

The app requires a schema, so an SQL script is provided in the `db.sql` to allow a quick setup; make.

Take note of the credentials (`username` and `password`), the `host`, the `port`, and the schema name (`db_name`) which will be used to communicate with the database. Make sure that the user can operate the previously mentioned schema; `root` user is set as a default, but it is highly recommended to use a different one in production.

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

## Install npm dependencies

To install the dependencies of both the frontend and backend, run the following command:

```
npm run install:deps
```

## Start the full app

To start the full app, run the following command:

```
npm run start:full-app
```

The app will be running at the specified backend url and port specified. Assuming the default url is, `http://localhost:3000`, the frontend will be accesible from `http://localhost/`, while the API endpoints are accesible from `http://localhost:3000/api`.

The app does not currently have a register/user creation module, but the backend has a seeder endpoint. By consuming the GET endpoint `<backend_host_url>/api/seed`, two users will be created; running it again will delete and recreate the users. The following credentials are used for login by default:


```
Normal user:
- Email: user@example.com
- Password: abc123

Admin user:
- Email: admin@example.com
- Password: def456
```

If you wish to change them, edit the file `./backend/src/seed/data/seed-data.ts` before running the seed; whether on initial setup or to change them later:

```
### ./backend/src/seed/data/seed-data.ts

. . .

export const initialData: SeedData = {
  users: [
    {
      email: 'user@example.com',
      username: 'User',
      password: bcrypt.hashSync('abc123', 10),
      role: UserRole.USER, // Assuming UserRole is an enum with a USER value
    },
    {
      email: 'admin@example.com',
      username: 'Admin',
      password: bcrypt.hashSync('def456', 10),
      role: UserRole.ADMIN, // Assuming UserRole is an enum with an ADMIN value
    },
  ],
};

. . .
```

By default, the seed endpoint does not require authentication nor authorization. If you wish to enable them, uncomment the following lines in the file `.backend/src/seed/seed.controller.ts`. Please be advised that without having an active admin user, you will not be able to run the seed:

```
### .backend/src/seed/seed.controller.ts

. . .

// import { Auth } from 'src/auth/decorators';
// import { UserRole } from 'src/auth/interfaces';

. . .

// @Auth(UserRole.ADMIN)

. . .

```

## Build backend and frontend

If you require a different setup, you can build both the frontend and backend for that purpose. To do so, run the following command:

```
npm run build:full-app
```

## Postman collection

A Postman collection has been provided in the file `./fullstack-nestjs-angular-app.postman_collection.json` to make it easier to more directly interact with the backend API.

## License

This app is [MIT licensed](https://github.com/amilkargm/prueba-tecnica-nestjs-angular/blob/main/LICENSE).
