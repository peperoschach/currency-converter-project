# Conversor de Moedas

Uma aplicação em Angular que converte três moedas para o Real Brasileiro (BRL).

## Pré-requisitos

- Node.js (<https://nodejs.org>)
- Angular CLI (<https://cli.angular.io>)

## Instalação

1. Clone este repositório:

2. Navegue até o diretório do projeto:

3. Instale as dependências do projeto:

## Execução

1. Inicie a aplicação em um servidor de desenvolvimento:

2. Abra seu navegador e acesse `http://localhost:4200` para visualizar a aplicação.

## Funcionalidades

- A aplicação exibe a conversão de três moedas para o Real Brasileiro (BRL): Dólar Canadense (CAD), Peso Argentino (ARS) e Libra Esterlina (GBP).
- É exibida a variação em porcentagem de cada moeda em relação ao Real Brasileiro.
- A hora da última atualização é mostrada na página.
- Valores menores ou iguais a R$1,00 são exibidos em vermelho, valores maiores que R$1,00 e menores ou iguais a R$5,00 são exibidos em verde, e valores maiores que R$5,00 são exibidos em azul.
- As informações são cacheadas no front-end por 3 minutos e são atualizadas automaticamente a cada 3 minutos.
- O cabeçalho da aplicação permanece fixo no topo, mesmo ao rolar a página.

## API de Moedas

Este projeto utiliza a API AwesomeAPI para obter as informações de conversão de moedas. A documentação da API pode ser encontrada em: <https://docs.awesomeapi.com.br/api-de-moedas>

## Autor

Seu Nome

## Licença

Este projeto está licenciado sob a [Licença XYZ](LICENSE).
