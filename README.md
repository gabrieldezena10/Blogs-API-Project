# Projeto API de Blogs

Desenvolver uma API e um banco de dados para a produção de conteúdo para um blog, seguindo os princípios de uma API RESTful.

É uma aplicação feita em Node.js usando o pacote sequelize para fazer um CRUD(create-read-update-delete) de posts.

Para fazer um post é necessário usuário e login, portanto foi trabalhada a relação entre user e post;

É necessário a utilização de categorias para os posts, trabalhando, assim, a relação de posts para categories e de categories para posts.

<hr></hr>

## Habilidades
ORM Sequelize, Node.js, Arquitetura MSC, JOI, Autentificação - JSON WEB Token, errorMiddleware.

<hr></hr>

## Utilização

- git clone git@github.com:gabrieldezena10/store-manager-project.git

Sem Docker

- npm install

Com Docker

docker-compose-up -d


  ### 👀 Observações importantes:

  Em cada requisito você encontrará uma imagem demonstrando como sua API deverá se comportar, dada a requisição específica.

  O não cumprimento de um requisito, total ou parcialmente, impactará em sua avaliação.

  O projeto possui uma pasta `src`, e é **fortemente recomendável que você construa sua aplicação dentro dessa pasta**.

  **Não é necessário usar o comando `npx sequelize-cli init`** uma vez que já é fornecido no projeto.

  #### Arquivos importantes

  ⚠️ Essa pasta ainda conta com alguns arquivos auxiliares que serão consumidos pelo avaliador e **não devem ser apagados em nenhuma hipótese**:

  > `src/api.js`
  ```javascript
  const express = require('express');

  // ...

  const app = express();

  app.use(express.json());

  // ...

  // É importante exportar a constante `app`, 
  // para que possa ser utilizada pelo arquivo `src/server.js`
  module.exports = app;
  ```
  Que ficará responsável por receber **as definições de middlewares e rotas** de sua API

  <br />

  ---

  > 👉 `src/server.js`
  ```javascript
  const app = require('./api');

  // não remova a variável `API_PORT` ou o `listen`
  const port = process.env.API_PORT || 3000;

  // não remova esse endpoint
  app.get('/', (request, response) => {
    response.send();
  });

  app.listen(port, () => console.log('ouvindo porta', port));
  ```
  Que ficará responsável por iniciar sua API

  <br />

  ---

  > 👉 `src/database/config/config.js`
  ```javascript
  require('dotenv').config();

  const environment = process.env.NODE_ENV || 'test';

  const suffix = {
    dev: '-dev',
    development: '-dev',
    test: '-test',
  };

  const options = {
    host: process.env.HOSTNAME || process.env.MYSQL_HOST || 'localhost',
    port: process.env.MYSQL_PORT || '3306',
    database: 
      `${process.env.MYSQL_DB_NAME || 'blogs-api'}${suffix[environment] || suffix.test}`,
    username: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASSWORD || '1234',
    dialect: 'mysql',
    dialectOptions: {
      timezone: 'Z',
    },
    logging: process.env.DEBUG !== 'false',
  };

  module.exports = {
    development: {
      ...options,
    },
    test: {
      ...options,
    },
  };
  ```
  Que é o arquivo de configuração principal do *Sequelize*

  <br />

  ---

  > 👉 `.sequelizerc`
  ```javascript
  const path = require('path');

  module.exports = {
    'config': path.resolve('src', 'database', 'config', 'config.js'),
    'models-path': path.resolve('src', 'database', 'models'),
    'seeders-path': path.resolve('src', 'database', 'seeders'),
    'migrations-path': path.resolve('src', 'database', 'migrations'),
  };
  ```
  Responsável por identificar os caminhos dos recursos do Sequelize

  <br />

  ---

  **Você irá precisar configurar as variáveis de ambiente para uso do MySQL.** Você pode usar esse [Conteúdo de variáveis de ambiente com NodeJS](https://blog.rocketseat.com.br/variaveis-ambiente-nodejs/) como referência.

  O arquivo a seguir, contém um modelo das variáveis de ambiente utilizadas no projeto. Para o contexto de teste local, é importante configurar as variáveis: `MYSQL_HOST`, `MYSQL_PORT`, `MYSQL_USER`, `MYSQL_PASSWORD`:

  > 👉 `.env.example`
  ```env
  #### SERVER VARS
  NODE_ENV=development
  API_PORT=3000

  #### DATABASE VARS
  MYSQL_HOST=localhost
  MYSQL_PORT=3306
  MYSQL_DB_NAME=blogs-api
  MYSQL_USER=root
  MYSQL_PASSWORD=password

  #### SECRECT VARS
  JWT_SECRET=suaSenhaSecreta
  ```

  #### Variável `JWT_SECRET`:
  
  Esta variável de ambiente deverá ser utilizada tanto para criar o token quanto para verificá-lo. Os teste locais e o avaliador vão utilizar a variável de ambiente `JWT_SECRET` para testar os requisitos

  **:warning:️ Variáveis de ambiente além das especificadas acima não são suportadas, pois não são esperadas pelo avaliador do projeto.**

<br />
</details>

<details>
  <summary><strong>👀 Dicas</strong></summary>

  #### Status HTTP

  Tenha em mente que todas as "respostas" devem respeitar os [status do protocolo HTTP](https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Status) com base no que o REST prega.

  Alguns exemplos:
  - Requisições que precisam de token mas não o receberam devem retornar um código de `status 401`;

  - Requisições que não seguem o formato pedido pelo servidor devem retornar um código de `status 400`;

  - Um problema inesperado no servidor deve retornar um código de `status 500`;

  - Um acesso ao criar um recurso, no nosso caso usuário ou post, deve retornar um código de `status 201`.

</details>


<hr></hr>

## Diagramas
![image](https://user-images.githubusercontent.com/86879421/180071346-917a6c6f-2d5f-42bc-8338-2f9950ae0c2a.png)

<i> Imagem disponibilizada pela Trybe </i>

<hr></hr>

## Endpoints

- POST `/login` - Gera um token quando é realizado o login de um usuário (email e senha).

- GET `/user` - Listar todos os usuários.
- GET `/user/:id` - Listar um usuário pelo id.
- POST `/user` - Cadastrar um usuário novo.
- DELETE `/user/me` - Deletar o próprio usuário baseado na autentificação do token de login.

- GET `/categories` - Listar todas as categorias de blogs presentes no banco de dados.
- POST `/categories` - Cadastrar uma nova categoria de blog no banco de dados.

- GET `/post` - Listar todos os posts (assim como os dados das tabelas de usuários e categorias atreladas).
- GET `/post/:id` - Listar um post pelo seu id correspondente (assim como os dados das tabelas de usuários e categorias atreladas).
- GET `/post/search?q=query` - Pesquisar produtos pelas chaves title ou content do post (substituindo `query` pelo termo que deve ser pesquisado).
- POST `/post` - Criar um novo post.
- PUT `/post/:id` - Atualizar informações de um post já existente.
- DELETE `/post/:id` - Deletar um post já existente pelo seu id correspondente.

<hr></hr>
