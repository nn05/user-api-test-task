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
