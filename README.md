# api REST com Node.js
api RestFull com crud completo, padrão mvc e banco de dados

# Definições e caracteristicas do projeto:
- Padrão RestFull
- Padrão MVC
- Uso da ORM Sequelize
- Node.js como linguagem principal
- MySQL como banco de dados
- Crud completo
- autenticação com o JWT
  
# Como rodar o programa: 
- Tenha o Node.js instalado em sua maquina
- Tenha o Mysql ou o Xampp instalado e configurado em sua maquina
- Crie um banco de dados chamado `api`
- Clone o projeto e navegue ate o diretório
- Configure o arquivo `connection`, alterando o usuario e a senha de acordo com a configuração do seu banco de dados.
- No terminal, digite o comando `npm install`
- No terminal, digite o comando `npm start`
- Digite o comando `node index.js`
- Use a documentação abaixo para conseguir acessar a Api facilmente.

# Documentação da api
Api utilizada para criação e manipulação de games e usuários.
## Endpoints
### 🔹 GET /games
endpoint responsável por retornar todos os games cadastrados no banco de dados.
#### Parametros
Nenhum.
### Respostas
  * **_200_** - ok.
esse statusCode indica o retorno de todos os games.
```
    {
    "games": [
        {
            "id": 1,
            "name": "Valorant",
            "age": 2020,
            "price": 0,
            "createdAt": "2023-08-08T12:07:06.000Z",
            "updatedAt": "2023-08-08T12:07:06.000Z"
        },
        {
            "id": 2,
            "name": "minecraft",
            "age": 2018,
            "price": 0,
            "createdAt": "2023-08-08T12:07:19.000Z",
            "updatedAt": "2023-08-08T12:07:19.000Z"
        }
    ]
}
```
* **_401_** - Falha na autenticação.
Motivos: Token inválido, Token expirado.
```
{
    "error": "invalid Token"
}
```
---
### 🔹 GET /games/:id
endpoint responsável por retornar o game específico do banco de dados.
#### Parametros
params: id do game.
### Respostas
* **_200_** - ok.
esse statusCode indica o retorno do game indicado pelo id.
```
[
  "game": {
          "id": 1,
          "name": "Valorant",
          "age": 2020,
          "price": 0,
          "createdAt": "2023-08-08T12:07:06.000Z",
          "updatedAt": "2023-08-08T12:07:06.000Z"
      },
]
```
* **_401_** - Falha na autenticação.
Motivos: Token inválido, Token expirado.
```
{
    "error": "invalid Token"
}
```
* **_404_** - game não encontrado.
O id indicado não pertence a um game.
```
{
    "error": "the game is not found."
}
```
* **_400_** - invalid id.
motivos: id invalido, não numerico ou inexistente.
```
{
    "error": "invalid id."
}
```
---
### 🔹 POST /games
endpoint responsável por criar games no banco de dados.
#### Parametros
* name: nome da categoria.

* age: ano de lançamento do game.

* price: preço do game.
```
{
    "name": "Rust",
    "age": 2015,
    "price": 200
}
```
### Respostas
* **_201_** - Created.
esse statusCode indica a criação da categoria.
```
{
    "msg": "rgame created!"
}
```
* **_401_** - Falha na autenticação.
Motivos: Token inválido, Token expirado.
```
{
    "error": "invalid Token"
}
```
* **_422_** - Unprocessable Entity
motivos: campos vazios ou inexistentes, ou preenchidos incorretamente.
```
{
    "error": "invalid filds."
}
```
---
### 🔹 PUT /games
endpoint responsável por atualizar os games cadastradas no banco de dados.
#### Parametros
* id: id do game.

* name: novo nome do game.

* age: novo ano de lançamento do game.

* price: novo preço do game
```
{
    "id": 1,
    "name": "minecraft",
    "age": 2011,
    "price": 150
}
```
### Respostas
* **_200_** - ok.
esse statusCode indica que o game foi atualizado.
```
{
    "message": "updated game"
}
```
* **_400_** - invalid id.
motivos: id invalido, não numerico ou inexistente.
```
{
    "error": "invalid id"
}
```
* **_401_** - Falha na autenticação.
Motivos: Token inválido, Token expirado.
```
{
    "error": "invalid Token"
}
```
* **_404_** - game não encontrado.
Não foi encontrado um game referente ao id indicado.
```
{
    "error": "The game is not found"
}
```
---
### 🔹 DELETE /games/:id
endpoint responsável por deletar categorias cadastradas no banco de dados.
#### Parametros
id: id que pertence a categoria.
### Respostas
* **_200_** - ok.
esse statusCode indica que o game foi deletado.
```
{
    "msg": "game deleted"
}
```
* **_400_** - invalid id.
motivos: id invalido, não numerico ou inexistente.
```
{
    "error": "invalid id"
}
```
* **_401_** - Falha na autenticação.
Motivos: Token inválido, Token expirado.
```
{
    "error": "invalid Token"
}
```
* **_404_** - game não encontrado.
```
{
    "error": "the game is not found"
}
```
---
### 🔹 GET /users
endpoint responsável por retornar todos os usuários cadastrados no banco de dados.
#### Parametros
Nenhum.
### Respostas
  * **_200_** - ok.
esse statusCode indica o retorno de todos os usuários.
```
[
  "users": [
        {
            "id": 1,
            "name": "Gabriel",
            "email": "gabriel@gmail.com",
            "password": "123456",
            "createdAt": "2023-08-08T11:57:54.000Z",
            "updatedAt": "2023-08-08T11:57:54.000Z"
        }
]
```
* **_401_** - Falha na autenticação.
Motivos: Token inválido, Token expirado.
```
{
    "error": "invalid Token"
}
```
---
### 🔹 GET /games/:id
endpoint responsável por retornar o usuário específico do banco de dados.
#### Parametros
* params: id do usuário.
### Respostas
* **_200_** - ok.
esse statusCode indica o retorno do game indicado pelo id.
```
[
  "users": [
        {
            "id": 5,
            "name": "Gabriel",
            "email": "gabriel@gmail.com",
            "password": "123456",
            "createdAt": "2023-08-08T11:57:54.000Z",
            "updatedAt": "2023-08-08T11:57:54.000Z"
        }
]
```
* **_401_** - Falha na autenticação.
Motivos: Token inválido, Token expirado.
```
{
    "error": "invalid Token"
}
```
* **_404_** - usuário não encontrado.
O id indicado não pertence a um usuário.
```
{
    "error": "the user not found."
}
```
* **_400_** - invalid id.
motivos: id invalido, não numerico ou inexistente.
```
{
    "error": "invalid id."
}
```
---
### 🔹 POST /games
endpoint responsável por criar usuários no banco de dados.
#### Parametros
* name: nome do usuário.

* email: email do usuário.

* password: senha do usuário.
```
{
    "name": "Gabriel",
    "email": "gabriel@gmail.com",
    "password": 123456
}
```
### Respostas
* **_201_** - Created.
esse statusCode indica a criação do usuário.
```
{
    "msg": "user created!"
}
```
* **_401_** - Falha na autenticação.
Motivos: Token inválido, Token expirado.
```
{
    "error": "invalid Token"
}
```
* **_422_** - Unprocessable Entity
motivos: campos vazios ou inexistentes, ou preenchidos incorretamente.
```
{
    "error": "invalid filds."
}
```
---
### 🔹 DELETE /games/:id
endpoint responsável por deletar usuários cadastrados no banco de dados.
#### Parametros
id: id que pertence ao usuário.
### Respostas
* **_200_** - ok.
esse statusCode indica que o usuário foi deletado.
```
{
    "msg": "user deleted"
}
```
* **_400_** - invalid id.
motivos: id invalido, não numerico ou inexistente.
```
{
    "error": "invalid id"
}
```
* **_401_** - Falha na autenticação.
Motivos: Token inválido, Token expirado.
```
{
    "error": "invalid Token"
}
```
* **_404_** - usuário não encontrado.
```
{
    "error": "user not found"
}
```
---
