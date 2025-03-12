# instivo-code-challenge

🎲 A Instivo code challenge!

### Validação de Campos:

* Implementar validações rigorosas para garantir a tipagem correta e o controle de caracteres dos campos recebidos.

- [x] As rotas todas contam com celebrate para validação dos campos.

### Cálculo e Retorno:

* Ao receber a data e o valor, o endpoint deve retornar um JSON com:

- [x] Cálculo de quantos dias, meses e anos se passaram até a data atual.
- [x] 35% do salário bruto.
- [x] Dados completos do cep.

### Chamada Externa:

* Realizar uma chamada à API do ViaCEP para obter informações de endereço com base no CEP fornecido pelo usuário.

- [x] Lógica implementada no serviço `ZipCode.service.ts`.

### Persistência de Dados:

- Armazenar os dados no MongoDB utilizando Mongoose ou Prisma.
- [x] Dados salvos utilizando o Mongoose.

### Consultas RESTful:

- Criar endpoints para consulta global e individual dos registros.
- Implementar suporte a filtros e paginação.
- [x] Rotas implementadas para consulta global e individual dos registros.

### Documentação:

- O retorno deve ser validado utilizando Insomnia, Postman ou Curl.
- [x] Validação feita utilizando o Insomnia.

### Testes Automatizados:

- Implementar testes automatizados (unitários e de integração) para garantir a qualidade do código.
- [x] Testes implementados utilizando Jest.
- [x] Apenas o serviço `ZipCode.service.ts` conta com teste de integração. Os demais testes são unitários.
- [x] Cobertura de testes de 100%, nas entidades de negócio (Serviços). Não testo entidades anêmicas.
- [x] Relatório de cobertura de testes gerado e pode ser acessado em
  `./instivo-backend/coverage/lcov-report/index.html`. Para rodar os testes basta executar o seguinte comando:
  ```bash
  $ npm run test:coverage
  ```

### Configuração Docker:

- O projeto deve ser configurado para rodar em um ambiente Docker, incluindo um Dockerfile e um docker-compose.yml para
  facilitar a orquestração.
- [x] Tanto o `Dockerfile` quanto o `docker-compose.yml` estão presentes na raiz do projeto.

### Documentação com OpenAPI:

- Criar uma documentação detalhada utilizando a especificação OpenAPI, garantindo que todos os endpoints,
  parâmetros e respostas sejam bem descritos, incluindo exemplos de requisições e respostas.
- [x] Documentação gerada utilizando o Swagger. Para acessar a documentação basta rodar o projeto e acessar
  `http://localhost:3000/v1/docs`. É possível fazer requisições diretamente pela documentação.

![swagger](/instivo-frontend/public/swagger.png)

### Controller Advice:

- Implementar um Controller Advice para tratamento de erros, garantindo que exceções sejam capturadas e retornadas
  em um formato JSON consistente e informativo.
- [x] Controller Advice implementado em `./instivo-backend/src/middlewares/errorHandler.middleware.ts`.

### Frontend em Next.js:

- Criar uma aplicação em Next.js que consuma a API desenvolvida em Node, permitindo que os
  usuários insiram a data de admissão, o valor salarial bruto e o CEP, exibindo os resultados de
  forma amigável.
- [x] Frontend implementado em Next.js. Para rodar o frontend basta acessar a pasta `instivo-frontend` e rodar o
  seguinte comando:
  ```bash
  $ npm run dev
  ```
  Em seguida, acessar `http://localhost:3000`.

## Como rodar o projeto?

### Backend

Certifique-se de ter o Docker e o Docker Compose instalados em sua máquina.
Em seguida, basta rodar o seguinte comando na raiz do projeto:

```bash
$ cd instivo-backend
$ npm install
$ docker-compose up
```

Aguarde até que as mensagens abaixo sejam exibidas, indicando que a aplicação está pronta:

```bash
instivo-backend  | ✅ Database initialized ✅
instivo-backend  | 🔥 Server is running at http://localhost:3333 🔥
```

### Frontend

Para rodar o frontend, basta acessar a pasta `instivo-frontend` e rodar o seguinte comando:

```bash
$ cd instivo-frontend
$ npm install
$ npm run dev
```

Aguarde até que a mensagem abaixo seja exibida, indicando que a aplicação está pronta:

```bash
   ▲ Next.js 15.2.2 (Turbopack)
   - Local:        http://localhost:3000
   - Network:      http://0.0.0.0:3000
```

Para executar os testes, basta rodar o seguinte comando na raiz do projeto:

```bash
$ cd instivo-frontend
$ npm run test
```

Implementei 2 testes simples para o frontend, apenas para exemplificar:

- [x] Um teste para garantir que os resultados da api mockados estão sendo exibidos na tela.
- [x] Um teste de integração chamado a API real e retornando os dados para a telinha azul após o clique no botão.

➡️ No fundo, ambos são o mesmo teste, apenas uma versão mockada e outra real.
Vale ressaltar que o teste de integração faz uma requisição real ao backend, então é necessário que o backend esteja
rodando, caso contrário o teste irá falhar.

### Observações:

- Como não havia layout, o frontend foi desenvolvido de forma simples, sem muitos estilos.
- O frontend foi desenvolvido utilizando o framework Next.js.
- Não me preocupei com a responsividade do frontend, pois o teste não pedia.
- Apenas o campo de CEP está com uma validação simples, pois o teste não pedia validações rigorosas no frontend.
- **Os env files estão versionados de propósito e também a url da api hardcoded no frontend. Claro que em uma situação
  real isso não seria feito, mas para fins de teste, achei mais prático deixar assim, para facilitar o trabalho do
  corretor.**

Aqui vai uma captura de tela do frontend:

![instivo-frontend](/instivo-frontend/public/img.png)

### O que eu faria diferente?

- Implementaria um sistema de autenticação para proteger as rotas. Cheguei inclusive a deixar o middleware de
  autenticação
  pronto, mas não implementei a autenticação em si.
- Implementaria um sistema de cache para as requisições ao ViaCEP, para evitar fazer requisições repetidas ao mesmo CEP.
- Utilizaria o TypeORM ao invés do Mongoose, pois acho ele mais robusto e com suporte a mais bancos de dados.
- Talvez apartaria a lógica de cálculo de tempo de serviço e 35% do salário bruto para um serviço separado,
  possibilitando reuso. Por hora decidi não fazer isso, pois a lógica é simples e apartar só iria gerar mais
  complexidade e novos processos de teste.
