# instivo-code-challenge

🎲 A instivo code challenge!

[x] Validação de Campos: 
    - Implementar validações rigorosas para garantir a tipagem correta e o controle de caracteres
      dos campos recebidos.

[x] Cálculo e Retorno:
    - Ao receber a data e o valor, o endpoint deve retornar um JSON com:
    - Cálculo de quantos dias, meses e anos se passaram até a data atual.
    - 35% do salário bruto.
    - Dados completos do cep.

[x] Chamada Externa:
    - Realizar uma chamada à API do ViaCEP para obter informações de endereço com base no CEP fornecido
      pelo usuário.

[x] Persistência de Dados:
    - Os dados devem ser salvos em um banco de dados MongoDB.

[x] Consultas:
    - Criar endpoints RESTful para consulta dos dados salvos, permitindo acesso global e individual,
    - com suporte a filtros e paginação.

[x] Documentação e Testes:
    - O retorno deve ser validado utilizando Insomnia, Postman ou Curl.

[x] Implementar testes automatizados (unitários e de integração) para garantir a qualidade do código.

[x] Configuração Docker:
    - O projeto deve ser configurado para rodar em um ambiente Docker, incluindo um Dockerfile e um
      docker-compose.yml para facilitar a orquestração.

[x] Documentação com OpenAPI:
    - Criar uma documentação detalhada utilizando a especificação OpenAPI, garantindo que todos os
      endpoints, parâmetros e respostas sejam bem descritos, incluindo exemplos de requisições e respostas.

[x] Controller Advice:
    - Implementar um Controller Advice para tratamento de erros, garantindo que exceções sejam capturadas
      e retornadas em um formato JSON consistente e informativo.

[x] API em Next.js:
    - Criar uma aplicação em Next.js que consuma a API desenvolvida em Node, permitindo que os
      usuários insiram a data de admissão, o valor salarial bruto e o CEP, exibindo os resultados de
      forma amigável.
