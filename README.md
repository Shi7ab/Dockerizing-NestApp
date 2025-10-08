
<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

<p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>

## Description
This project is a **GraphQL API** built with **NestJS**.  
It currently supports **user management** (create, read, update, delete) and **authentication** (login, password reset, update).  

Data is persisted in **PostgreSQL** instead of memory storage.

---

## Project setup

```bash
# install dependencies
npm install
````

---

## Environment Variables

Create a `.env` file in the project root with the following variables:

```env
# JWT configuration
JWT_SECRET=your_secret_key
JWT_EXPIRATION=3600s

# Database configuration (PostgreSQL)
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=graphql_nest
```

---

## Running Locally with npm

```bash
# development mode
npm run start

# watch mode
npm run start:dev

# production mode
npm run start:prod
```

Open GraphQL Playground at [http://localhost:3000/graphql](http://localhost:3000/graphql) to test queries and mutations.

---

## Running with Docker

### Dockerfile

```dockerfile
# Stage 1: Build
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Production
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY --from=builder /app/dist ./dist
EXPOSE 3000
CMD ["node", "dist/main.js"]
```

### docker-compose.yml

```yaml
services:
  app:
    build: .
    container_name: graphql_nest_app
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=development
      - JWT_SECRET=your_secret_key
      - JWT_EXPIRATION=3600s
      - DB_HOST=database
      - DB_PORT=5432
      - DB_USERNAME=postgres
      - DB_PASSWORD=postgres
      - DB_NAME=graphql_nest
    depends_on:
      - database

  database:
    image: postgres:15
    container_name: graphql_nest_db
    ports:
      - "5432:5432"
    environment:
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=postgres
      - POSTGRES_DB=graphql_nest
    volumes:
      - pgdata:/var/lib/postgresql/data

volumes:
  pgdata:
```

### Run with Docker

```bash
# build and start containers
docker compose up --build

# stop containers
docker compose down
```

---

## GraphQL Examples

### Create a user

```graphql
mutation {
  createUser(createUserData: {
    username: "shihab",
    email: "shihab@example.com",
    password: "123456",
    age: 25
  }) {
    userId
    username
    email
    age
  }
}
```

### Login

```graphql
mutation {
  login(loginData: { username: "shihab", password: "123456" }) {
    access
  }
}
```

### Get users

```graphql
query {
  helloUsers(userIds: ["<USER_ID>"]) {
    userId
    username
    email
  }
}
```

---

## Tests

```bash
# unit tests
npm run test

# e2e tests
npm run test:e2e

# coverage
npm run test:cov
```

---

## Resources

* [NestJS Documentation](https://docs.nestjs.com)
* [GraphQL Docs](https://graphql.org/learn/)
* [NestJS Devtools](https://devtools.nestjs.com)

---

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).

```

