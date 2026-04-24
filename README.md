# Tarefas Fullstack

O projeto fullstack de gerenciamento de tarefas, foi desenvolvido
com Angular no frontend e ASP.NET Core (.NET 10) no backend.

->> Sobre o projeto

Este sistema permite que você possa:
- Criar tarefas
- Editar tarefas
- Deletar tarefas
- Marcar tarefas como concluídas e Desmarcar como pendente.

 ->> Aqui está as tecnologias que foi utilizadas:

# Backend
- .NET 10
- ASP.NET Core Web API
- Entity Framework Core
- SQL Server
- 
# Frontend
- Angular
- TypeScript
- HTML
- 
# Ferramentas
- Git & GitHub
- Visual Studio code
- Sawgger

->> Funcionalidades da API (Backend)

A API segue o padrão REST e possui os seguintes endpoints:
- **GET /tarefas**  
  Retorna todas as tarefas cadastradas.

- **GET /tarefas/{id}**  
  Retorna uma tarefa específica pelo ID.

- **POST /tarefas**  
  Cria uma nova tarefa no sistema.

- **PUT /tarefas/{id}**  
  Atualiza os dados de uma tarefa existente (ex: título, descrição).

- **DELETE /tarefas/{id}**  
  Remove uma tarefa do sistema com base no ID informado.  
  Caso o ID não exista, a API pode retornar erro (404 Not Found).

A API utiliza o **Entity Framework Core** para comunicação com o banco de dados e o **Swagger** para documentação e testes dos endpoints.
 
->> Para Rodar o projeto:

# Backend 
 bash
1) cd ProjetoApi
2) dotnet run

# Frontend
1) cd tarefas-app
2) npm install
3) ng serve

# Acesso 
Frontend: http://localhost:4200

Backend: http://localhost:5111/swagger/index.html

Autor
Desenvolvido por: Jenerson Rocha
