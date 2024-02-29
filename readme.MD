# MERN Stack Boilerplate

This MERN Stack (MongoDB, Express, React, Node) Boilerplate project provides a solid foundation for kickstarting your full-stack web development endeavors.

## Table of Contents

- [Introduction](#introduction)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Configuration](#configuration)
  - [Usage](#usage)
- [Project Structure](#project-structure)
- [Features](#features)
- [Contributing](#contributing)

## Introduction

This boilerplate is designed to streamline the development process for MERN stack applications. It includes a basic setup for the server and client sides, authentication, and common development tools.

## Getting Started

### Prerequisites

Make sure you have the following installed on your machine:

- Node.js: [Download Here](https://nodejs.org/)
- npm: [Download Here](https://www.npmjs.com/)

### Installation

1. Clone the repository :

   ```bash
   git clone https://github.com/zulmy-azhary/mern-boilerplate.git
   ```

2. Change into the project directory :
   
   ```bash
   cd mern-boilerplate
   ```

3. Install dependencies for both client and server by running this following command :
   
   ```bash
   npm run install-all
   ```

### Configuration

1. Rename `.env.example` to `.env` and update the environment variables with your specific configuration.

### Usage

1. Start the development server :
   
   ```bash
   npm run dev
   ```

2. Open your browser and navigate to http://localhost:5000 for server and http://localhost:5173 for client.

## Project Structure
The project follows a structured approach, separating the server and client components. Key directories include :

* `/server` : Backend server using Express
  * `/server/src/config` : Configuration files
  * `/server/src/routes` : API routes
  * `/server/src/controllers` : Request handlers / controllers
  * `/server/src/libs` : Libraries and utilities
  * `/server/src/models` : Data models
  * `/server/src/schemas` : Data schemas
  * `/server/src/services` : Data models' services
  * `/server/src/middlewares` : Middleware handlers
  * `/server/src/types` : Utility types for server environment

* `/client` : Frontend ReactJS application
  * `/client/src/api` : Request handlers for client
  * `/client/src/components` : React components
  * `/client/src/config` : Configuration files
  * `/client/src/hooks` : Custom hooks
  * `/client/src/lib` : Libraries and utilities
  * `/client/src/routes` : Route pages
  * `/client/src/schemas` : Form schemas' validations
  * `/client/src/services` : Services for data fetching, mutation and manipulation
  * `/client/src/store` : Zustand store's state management
  * `/client/src/types` : Utility types for client environment

You can see for the details of project structure below :
```
mern-boilerplate
|
└───.eslintrc.json
└───.gitignore
└───.prettierignore
└───.prettierrc
└───package.json
└───README.md
└───.husky
|   └─── ...
└───client
│   └───.env.example
│   └───.gitignore
│   └───package.json
│   └───components.json
│   └───index.html
│   └───tailwind.config.js
│   └───postcss.config.js
│   └───tsconfig.json
│   └───tsconfig.node.json
│   └───vercel.json
│   └───vite.config.ts
│   └───public
|   |   └─── ...
│   └───src
│       └───main.tsx
│       └───index.css
│       └───routeTree.gen.ts
│       └───vite-end.d.ts
│       └───api
|       |   └─── ...
│       └───components
|       |   └───auth
|       |   |   └─── ...
|       |   └───layout
|       |   |   └─── ...
|       |   └───ui
|       |       └─── ...
│       └───config
|       |   └─── ...
│       └───hooks
|       |   └─── ...
│       └───lib
|       |   └─── ...
│       └───routes
|       |   └─── ...
│       └───schemas
|       |   └─── ...
│       └───services
|       |   └─── ...
│       └───store
|       |   └─── ...
│       └───types
|           └─── ...
└───server
    └───.env.example
    └───.gitignore
    └───nodemon.json
    └───package.json
    └───tsconfig.json
    └───vercel.json
    └───src
        └───server.ts
        └───config
        |   └─── ...
        └───controllers
        |   └─── ...
        └───libs
        |   └─── ...
        └───middlewares
        |   └─── ...
        └───models
        |   └─── ...
        └───routes
        |   └─── ...
        └───schemas
        |   └─── ...
        └───services
        |   └─── ...
        └───types
            └─── ...
```

## Features

* **Authentication**: User authentication using JWT tokens and HttpOnly Cookie.
* **Update User Account**: User can update their account information.
* **MongoDB Integration**: Utilizes MongoDB for data storage.
* **Development Tools**: Includes `nodemon` for server auto-restart and `concurrently` for running server and client concurrently.
* **Styling**: Basic styling setup with TailwindCSS and ShadCN UI.
* **Formatting**: Prettier for code formatter.
* **Linting**: Integrated ESLint for maintaining code quality.

## Contributing

Contributions are welcome! Feel free to create issues or submit pull requests to improve or add features.