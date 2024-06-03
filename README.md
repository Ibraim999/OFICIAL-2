
*REPOSITÓRIO DE TESTE DE UMA API DE MATRICULAS*

*Tecnologias Utilizadas*

Teste automatizado utilizando Cypress

API testada: https://github.com/PHPauloReis/oficial2-matriculas-api/

História de usúarios: https://dear-creature-6bf.notion.site/Avalia-o-Oficial-2-Gerenciamento-e-Qualidade-de-Softwares-e329b3e6e42c4998ac1eff689e670d6e

*Pré-requisitos*

Clone o repositório para o seu gerenciador de arquivos local.

Execute o comando npx cypress open no terminal dentro da pasta clonada.

Abra o projeto no VS Code para melhor visualização.

     Certifique-se de ter o framework de automação de testes Cypress instalado previamente.

Tenha o Intelij Idea Community instalado para executar a API com o JDK no projeto.

Instale o Postman para rodar as requisições.

*Utilização da API*

Endpoint: http://localhost:8080/v1/matriculas/{numero_da_matricula}

Método: GET

Configure o Postman com o header: X-API-KEY = unime-qualidade-oficial2, pois todas as chamadas à API devem informar esse header com o valor unime-qualidade-oficial2.
