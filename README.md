## Description

This is a simple starter project for a NestJS application. 

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Sonar setup
After setting up the project on sonar, you will get a scanner command, which you should copy and paste into sonar.sh file. Which will be in the root directory and look like this, create a file called sonar.sh and paste the command in it. Also create a script in package.json to run the sonar.sh file.
```bash
sonar-scanner \
  -Dsonar.projectKey=nest-setup \
  -Dsonar.sources=. \
  -Dsonar.host.url=http://localhost:9000 \
  -Dsonar.token=sqp_829fd7106a91803a284afa9e91336a88dd6290cf

  "sonar": "./sonar.sh"
```

Then give permission to run the file.
```bash
chmod +x sonar.sh
```


## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov

# run sonar
$ npm run sonar
```
## Swagger
http://localhost:3000/dev/swagger/api



## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
