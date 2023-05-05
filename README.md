[![SERVREST-API](https://img.shields.io/badge/API-ServeRest-brightgreen)](https://github.com/PauloGoncalvesBH/ServeRest/)
[![PLAYWRIGHT-CI](https://github.com/ulucasfraga/playwright_for_studies/actions/workflows/tests.yml/badge.svg?branch=main)](https://github.com/ulucasfraga/playwright_for_studies/actions/workflows/tests.yml)

-----------------------

# PLAYWRIGHT-TESTS

Repository with examples for studies on automated tests with **[Playwright](https://playwright.dev/)** for **API** and **UI**.

Tools:

- docker
- allure
- expected playwright
- faker
- http-status-codes

**NOTE:** The programming language chosen was JavaScript and the OS Windows.

> The **Playwright** enables reliable end-to-end testing for modern web apps. [GET TO KNOW PLAYWRIGHT](https://playwright.dev/)

- [GET TO KNOW DOCKER](https://playwright.dev/docs/docker)
- [GET TO KNOW ALLURE](https://github.com/allure-framework/allure-js)
- [GET TO KNOW FAKER](https://github.com/guykisel/robotframework-faker/blob/master/README.rst)
- [GET TO KNOW STATUS CODE](https://github.com/prettymuchbryce/http-status-codes)

-----------------------

## Context table

> Index `README`.

  - [Prerequisites](#prerequisites)
  - [Configuration](#configuration)
  - [Installation](#installation)
  - [Structure](#structure)
  - [How to test](#how-to-test)
  - [How to view the Report](#how-to-view-the-report)
  - [Support](#support)
  - [License](#license)

-----------------------

### Prerequisites

- [Chocolatey or Scoop](https://www.makeuseof.com/windows-install-scoop/)
- [Allure](https://www.programsbuzz.com/article/how-install-allure-windows)
- [NodeJS +18](https://nodejs.org/pt-br/download/package-manager/)
- [Yarn](https://edca.com.br/blog/instalando-o-nodejs-e-o-yarn-em-4-passos)
- [VSCode or other IDE](https://code.visualstudio.com/download)

**NOTE:** The project use Node v18 (.nvmrc). It is recommended to use nvm to manage different Node versions in your environment.

-----------------------

### Configuration

> Tips:

Use the **Chocolatey** or **Scoop** to download the packages.

#### Examplos 

> Allure:

```bash
$ scoop install allure
```

> Node:

```bash
$ scoop install nodejs
```

> Yarn:

```bash
$ scoop install yarn
```

> To clone the project:

```bash
$ git clone https://github.com/uLucasFraga/playwright_for_studies.git
```

- Use the terminal to install the dependencies on __package.json__, for example:

```js
    $ yarn
```

> IMPORTANT:

  - Do not expose senstive data:

It's necessary to create a root `.env` file of the project as in the example: `.env.example`.

Use the data below:

```env
API_SERVEREST=https://serverest.dev
E2E_SERVEREST=https://front.serverest.dev

USER=fulano@qa.com
PASSWORD=teste
```

After creating the .env, your tests are ready to run.

-----------------------

### Installation


> To clean the project & install all dependencies via **package.json**:

```js
$ cd /playwright-for-studies
$ yarn clean
$ yarn install
```

-----------------------

### Structure

The structure of the repository follows the architecture below:

```
playwright-for-studies/                     
 ├── .github/                               
 │    ├── action/                           
 │        ├── setup/                        
 │          ├── action.yml                  # Setup for the CI
 │    ├── workflows/                        
 │        ├── tests.yml                     # Configuration for the tests on CI
 │    ├── pull_request_template.md          # Template for PR on github
 ├── lib/                                   
 │    ├── helpers.js                        # Helper function for the tests
 ├── tests/                                 
 │     ├── api/      
 │        ├── login/                        # Serverest API tests              
 │          ├── login.api.js                # Serverest API tests
 │     ├── e2e/
 |        ├── login/                        # Serverest API tests                                
 │          ├── login.e2e.js                # Serverest UI tests
 ├── .env                                   # Env data
 ├── package.json                           # Dependencies file for the project
 ├── playwright.config.js                   # Configuration file of Playwright
```

-----------------------

### How to test

After confirming the previous settings, follow the steps below:


> To run all API tests:

```js
$ yarn test:api
```

> To run all UI tests:

```js
$ yarn test:e2e
```

> To run debug mode:

Set PWDEBUG: `set PWDEBUG=1`

```js
$ PWDEBUG=1 yarn test:e2e
```

> To run with open browser mode:

```js
$ npx playwright test --headed
```

###### Docker - API

> Tips: To run on Docker for API tests

First: Open docker

```js
$ yarn api:start
$ yarn test:api
```

###### Docker - E2E

> Tips: To run on Docker for E2E tests

First: Open docker

```js
$ docker-compose up -d
```

-----------------------


### How to view the Report

Reports are generated by [Allure](https://github.com/allure-framework).

It's necessary to have **Allure** installed in the project (via package) or in your machine according to the **Installation** topic of this README.


> To generate the report:

```js
$ yarn allure:generate
```

Now, a folder called: `allure-results` or `test-results` will be created.


> To generate the report inside an allure server:

```js
$ yarn allure:serve
```

> To open the HTML with the report:

```js
$ yarn posttest
```

-----------------------

### Support

- Linkedin: <a href="https://www.linkedin.com/in/ulucasfraga/" target="_blank">**Lucas Fraga**</a>

-----------------------

### License

[![License](https://img.shields.io/:license-mit-blue.svg?style=flat-square)](http://badges.mit-license.org)

- **[MIT license](http://opensource.org/licenses/mit-license.php)**
- Copyright 2023 © <a href="https://github.com/ulucasfraga" target="_blank">LUCAS FRAGA</a>
