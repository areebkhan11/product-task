# Monke Labs Full Stack Developer Exercise
for databas start run command docker-compose up
for starting project run npm start

all required apis are created 
## Description

This is a simple backend exercise that uses Node.js and Express.js to create a server that serves JSON as a response to a REST API calls. Postgresql is used as the database and Knex.js is used as the query builder. Docker is used to run the database.

## Instructions

**Step-1:** Fork and clone the repository.
```bash
git clone https://github.com/mon-kelabs/task.git
```

**Step-2:** Download and Install Docker Desktop from [here](https://www.docker.com/products/docker-desktop).

**Step-3:** Download and Install Node.js 18 LTS from [here](https://nodejs.org/en/download).

**Step-4:** After installing Docker Desktop, open the terminal and go to the project directory.
```bash
cd task
```
**Step-5:** Run the following command to install the dependencies.
```bash
npm install knex nodemon pg -g
npm install
```

**Step-6:** Run the following command to build and run the postgres database.
```bash
docker-compose up --build -d
```

**Step-7:** Run the following command to run the migrations.
```bash
knex migrate:latest
```

**Step-8:** Run the following command to run the seeders.
```bash
knex seed:run
```

**Step-9:** Run the following command to run the server.
```bash
npm run start
```

## Tips

* The server runs on http://localhost:3000.
* You can access the database cli by running the following command:
```bash
    npm run db
```
* You can access the database using the following credentials:
```bash
    host: localhost
    port: 5432
    username: admin
    password: 12345678
    database: monke
```
Hope you enjoy the exercise!
