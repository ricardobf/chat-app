# Chat App

[![GitHub license](https://img.shields.io/github/license/ricardobf/chat-app)](https://github.com/ricardobf/chat-app/blob/production/LICENSE)
[![GitHub issues](https://img.shields.io/github/issues/ricardobf/chat-app)](https://github.com/ricardobf/chat-app/issues)
[![GitHub stars](https://img.shields.io/github/stars/ricardobf/chat-app)](https://github.com/ricardobf/chat-app/stargazers)

This repository uses Go (Backend), React (Frontend) and Redis (Store messages) to deploy a simple chat-app application.

The production (backend) docker file is available on [DockerHub - ricardob/chat-app-backend](https://hub.docker.com/r/ricardob/chat-app-backend)

The production (frontend) docker file is available on [DockerHub - ricardob/chat-app-frontend](https://hub.docker.com/r/ricardob/chat-app-frontend)

**Table of Contents**

1. [Requirements](#requirements)
1. [Installation](#installation)
1. [License](#license)

## Requirements

- Git;
- Go; (for development installation)
- Docker; (for development installation)
- Docker Compose; (for development installation)
- nodejs, npm; (for development installation)
- Circle CI account; (for production deployment)

## Development Installation

### Install and run the application locally:

Using Docker Compose:

1. Clone this repository

With SSH
```shell
# git clone git@github.com:ricardobf/chat-app.git
```
or with HTTPS
```shell
# git clone https://github.com/ricardobf/chat-app.git
```

2. Navigate to application folder:
```shell
# cd chat-app
```

3. Run `docker-compose` command:
```shell
# docker-compose up
```

4. On your browser navigate to [localhost:3000](http://localhost:3000)


## License

See [LICENSE](https://github.com/ricardobf/chat-app/LICENSE).