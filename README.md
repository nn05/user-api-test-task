# User API Test Task

## Quick start

1. Clone this repo using:
  ```shell
  $ git clone git@github.com:basi1iscus/user-api-test-task.git
  ```

2. To install dependencies and clean the git repo run:

  ```shell
  $ yarn install
  ```

  or

  ```shell
  $ npm install
  ```
3. Copy .env.example file to .env and make the necessary changes there

4. Run project

  ```shell
  $ yarn start
  ```

## API

#### users

POST/PUT - Request body 
```Shell
{ 
   "firstName": "string",
   "lastName": "string",
   "email"?: "string",
   "homePhone"?: "string",
   "inquiryDetails"?: "InquiryDetails = {}",
   "interests"?: "string[]",
   "isArchived"?: "boolean",
   "isSpam"?: "boolean"
}
```

```Shell
GET /api/v1/users/ - get all users
GET /api/v1/users/:userID - get all user 'userID'
POST /api/v1/users/ - create new user
PUT /api/v1/users/:userID - change user 'userID'
PATCH /api/v1/users/:userID - update user 'userID'
DELETE /api/v1/users/:userID - delete user 'userID'
```
#### logs

```Shell
GET /api/v1/logs/ - get log records
DELETE /api/v1/logs/ - delete all logs
```

## Command Line Commands

#### Installation

```Shell
yarn install
```
Installs the dependencies.

#### Testing

```Shell
yarn run test
```

#### Docker
Node server working on 8090 ports on localhost

```run
docker-compose -f ./docker-compose.yml up (Options: --build for build, -d to detach )
docker-compose -f ./docker-compose.yml down (To stop contaiters)
```
