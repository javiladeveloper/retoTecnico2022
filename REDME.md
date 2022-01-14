### Introducction
This project has been created for the evaluation of Multiplica Talent, it was done with a lot of love and dedication to the services, for more clean code
## Dependencies

The root folder will only contain basic configure files. Each project specifies its own dependencies in their package.json file. 
we will explain a little of each one

dotenv: getting enviroment variables
express: up server
joi: validator inputs
mysql2 && sequelize: libraries necessary for sequelize to work
ava && sinon: libraries from unit test
nyc: to use the coverage
nodemon: for the most fluid development of the project
### Cloud
url for cloud
https://retotecnico2022.herokuapp.com/retoTecnico/

just add the name of the service, after the server prefix and everything will work ok
like this!
https://retotecnico2022.herokuapp.com/retoTecnico/colores?page=1

### API DOCUMENTATION
https://documenter.getpostman.com/view/12046942/UVXjJazb

### GIT SOURCE
git@github.com:javiladeveloper/retoTecnico2022.git
branch is master

### .ENV
They are not the best practices, but I will leave in the readme all the values ​​that will go into the .env file

#Base de datos Mysql
DB_USERNAME= 'uwjryq4815e7eycr'
DB_PASSWORD= "PfjtM7IlBwb8g8SqSWXL"
DB_MAIN= "bu7zxyqbmsfyed2hv9xj"
DB_HOST= "bu7zxyqbmsfyed2hv9xj-mysql.services.clever-cloud.com"

#Configuration Server
PORT= '4000'
size_page = 4

### Built With

This project use specially framework for expose as api rest application.

### Setup

In order to start development or testing, you must complete these steps.

```shell
# First install all the dependencies
npm install

# Configure enviroment variables if necessary
.env

# To start the project write the following
npm run develop

```

### Folder Structure
    .  
    ├── src                         # source code
    ├── test                        # tests folder
    ├── package.json
    ├── readme.md
    ├── .env


## Getting Started


This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Local development

```shell
# create a new branch
git checkout -b <branch-name>

# committing changes
git add -A
git commit -m "<commit-message>"
git push -u origin <branch-name>
```
## Testing

### Unit Test

To do unit/integration tests we're using ava and nyc, each project contains its package.json with the testing configuration.


```shell
# run all test suites
npm run test

# run all tests with coverage report
npm run test:coverage

# run a single testing folder
<unit-test-group>
npm test test/<test-folder>/*

# run a single testing file
<test-file>
npm test test/<test-file>



