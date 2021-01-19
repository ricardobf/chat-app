# Teste Devops - Smarttbot

Dentro deste repositório você irá encontrar duas aplicações, uma escrita em Go (Backend) e outra em React (Frontend).

As aplicações compõem um sistema simples de chat que utiliza o Redis (https://redis.io/) para armazenamento das mensagens.

Você deverá criar um repositório no Git de sua preferência (Gitlab, Github, Bitbucket, etc.) com o conteúdo deste repositório e as alterações que julgar necessárias para a criação de dois ambientes distintos:

- Desenvolvimento - Utilizando docker e docker-compose
- Produção - Utilizando docker e uma ferramenta de CI/CD para automatizar o build e push das imagens docker para o DockerHub. Você pode escolher uma das seguintes ferramentas:
  - CircleCI
  - GitlabCI
  - TravisCI
  - Jenkins

Além disso, você deverá documentar seu trabalho da melhor maneira possível. Quando finalizar, é só enviar o link do seu repositório pra gente.

> OBS: As documentações das aplicações são propositalmente vagas, então recorra à leitura do código em caso de dúvidas sobre o funcionamento.