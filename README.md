# Knowledge - Base de Conhecimento

<p align="center">
   <img src="https://github.com/AfonsoMachado/knowledge/blob/master/frontend/src/assets/base.png" alt="Base de conhecimento" width="400"/>   
</p>

<p align="center">:rocket: Knowledge é um sistema web que armazena artigos diversos ligados à uma área de conhecimento. O sistema tem acessos para um usuário normal, somente para consulta dos artigos, e para administrador, que cadastra as categorias e artigos.</p>

<p align="center">Desenvolvido durante a realização do curso <a href="https://www.cod3r.com.br/courses/web-moderno">Web Moderno com JavaScript 2020 COMPLETO + Projetos</a> promovido pela <a href="https://www.cod3r.com.br/">Cod3r</a></p>

 ## :computer: Tecnologias
<ul>
 <li><a href="https://github.com/vuejs/vue">Vue.js</a></li>
 <li><a href="https://github.com/axios/axios">Axios</a></li>
 <li><a href="http://knexjs.org/">Knex</a></li>
 <li><a href="https://expressjs.com/en/api.html#express">Express</a></li>
 <li><a href="https://expressjs.com/en/resources/middleware/cors.html">Cors</a></li>
 <li><a href="https://github.com/jarradseers/consign#readme">Consign</a></li>
 <li><a href="https://jwt.io/">JWT</a></li>
 <li><a href="https://www.mongodb.com/try/download/community">MongoDB</a></li>
 <li><a href="https://www.postgresql.org/">postgreSQL</a></li>
</ul>

## :fire: Instalação

Para instalar e executar o software localmente, é necessário ter um ambiente NodeJS ou Yarn instalado em sua máquina, além do MongoDB e PostgreSQL instalado.

### Clonando o repositório:

```
$ git clone https://github.com/AfonsoMachado/knowledge.git
```

### Configurando banco de dados:

#### MongoDB

```
$ sudo mongod
```

#### PostgreSQL

```
$ psql -U <user>
```
 - Inserir seu usuário do Postgres no campo <user>
 
### Executando backend:

Configurar primeiramente o arquivo .env, renomeando o arquivo env_file e editando com suas informações, inserindo o authSecret e as informações do Postgres: nome do banco de dados, usuario e senha do Postgres.
 
```bash
# Go to backend folder
$ cd knowledge/backend

# Install Dependencies
$ npm install

# Run Aplication
$ npm start
```
Executando em http://localhost:3000/

 ### Executando frontend:
 
 ```bash
# Go to frontend folder
$ cd knowledge/frontend

# Install Dependencies
$ npm install

# Run Aplication
$ npm run serve
```
Executando em http://localhost:8080/

## :memo: Licença

Esse projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## :white_check_mark: Resultado

![](https://github.com/AfonsoMachado/knowledge/blob/master/final.jpg)

---

<p align="center">Feito com 💜 por <strong><a href="https://www.linkedin.com/in/AfonsoMachado/">Afonso Machado</a> 🥰 </strong> </p>
