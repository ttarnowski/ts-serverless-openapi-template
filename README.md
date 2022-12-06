# [Template] TypeScript + OpenAPI + Serverless Project

Starter project for TypeScript REST API applications compliant with OpenAPI 3.0 specification(formerly Swagger) that gets auto-generated
from the code for maximally efficient development experience, integrated with [`express`](https://github.com/expressjs/express) and [`serverless`](https://github.com/serverless/serverless) frameworks.

## Features

Thanks to [`tsoa`](https://github.com/lukeautry/tsoa):
- TypeScript controllers and entities as a single source of truth for your API
- A valid OpenAPI specification is generated from your code
- jsDoc supported for object descriptions (most other metadata can be inferred from TypeScript types)
- Built-in request payload validation inferred from entity TypeScript types and/or jsDoc comments
- Integrated with [`express`](https://github.com/expressjs/express)

Thanks to [`inversify`](https://github.com/inversify):
- Lightweight inversion of control container for TypeScript
- Provides with set of TypeScript decorators that effectively integrate with tsoa controllers and services

Thanks to [`node-config`](https://github.com/node-config/node-config):
- Zero-config application configuration library
- Allows for defining a set of default paramaters that can be extended for different deployment environments (dev, staging, prod, test, etc.) or overriden by environment variables, command line parameters, or external sources
- Provides a consistent configuration interface

Thanks to [`serverless`](https://github.com/serverless/serverless):
- Uses YAML syntax to deploy both the code and cloud infrastructure
- Single command to deploy the project to AWS

Thanks to [`@vendia/serverless-express`](https://github.com/vendia/serverless-express):
- Integrates [`express`](https://github.com/expressjs/express) with [`serverless framework`](https://github.com/serverless/serverless)

Thanks to [`jest`](https://github.com/facebook/jest) and [`supertest`](https://github.com/ladjs/supertest):
- End-to-end API testing
- Integration testing
- Unit testing

Thanks to [`swagger-ui-express`](https://github.com/scottie1984/swagger-ui-express):
- Automatically generated OpenAPI documentation page accessible under `/docs` endpoint

## Prerequisites

- [`serverless-framework`](https://github.com/serverless/serverless)
- [`node.js`](https://nodejs.org)
- [`AWS Account`](https://aws.amazon.com/) with programatic access and [`AWS CLI`](https://aws.amazon.com/cli/) configured locally for infrastructure and code deployment
- (optionally) [`GitHub Account`](https://github.com) to create new GitHub project from this template repository.


## Usage

To create new serverless TypeScript + OpenAPI + Serverless project using this template follow the link below:

[Create New Repository](https://github.com/ttarnowski/ts-serverless-openapi-template/generate)

Once new repository is created from this template you can clone your newly created project:

```
git clone <your-new-project-github-url> <target-directory>
```

Change directory to the one containing your newly created project:

```
cd <target-directory>
```

Run:

```
npm install
```

or:

```
yarn
```

## Licence

MIT.
