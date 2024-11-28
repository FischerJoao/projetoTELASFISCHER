# 🚀 Relatório de Desenvolvimento - Gerenciador de Tarefas

## 📋 Descrição do Projeto

Este projeto é um **gerenciador de tarefas** que permite ao usuário adicionar, editar, excluir e listar tarefas. A aplicação foi desenvolvida usando o framework **React Native** para a interface do usuário e o **Express** para o servidor backend. O servidor utiliza um banco de dados em memória para armazenar as tarefas durante a execução do servidor.

## ⚙️ Funcionalidades Implementadas

1. **📝 Adicionar Nova Tarefa**
   - O usuário pode adicionar novas tarefas com descrição e status (pendente ou concluída).
   - As tarefas são armazenadas no servidor e exibidas na tela inicial.

2. **📜 Listar Tarefas**
   - A tela inicial lista todas as tarefas salvas no servidor.
   - A lista é carregada automaticamente quando o aplicativo é iniciado ou quando uma tarefa é adicionada, editada ou excluída.

3. **✏️ Editar Tarefa**
   - O usuário pode editar a descrição e o status de uma tarefa existente.
   - Após a atualização, a lista de tarefas na tela inicial é automaticamente recarregada.

4. **❌ Excluir Tarefa**
   - O usuário pode excluir uma tarefa da lista.
   - A tarefa é removida do servidor e da lista exibida na tela inicial.

## 🖥️ Estrutura do Código

O projeto é dividido em três partes principais: **HomeScreen**, **NovaTarefaScreen**, e **EditarTarefaScreen** no frontend, e o backend implementado com **Express.js**.

### Backend (Servidor)

O servidor foi construído utilizando **Express.js** para gerenciar as requisições HTTP.

#### Endpoints Criados

- **POST /tarefas**: Adiciona uma nova tarefa.
- **GET /tarefas**: Retorna a lista de todas as tarefas.
- **GET /tarefas/:id**: Retorna uma tarefa específica pelo ID.
- **PUT /tarefas/:id**: Atualiza uma tarefa existente.
- **DELETE /tarefas/:id**: Exclui uma tarefa existente.

O servidor mantém um contador de IDs para garantir que cada tarefa tenha um identificador único, e as tarefas são armazenadas em memória enquanto o servidor está ativo.

### Frontend (React Native)

A interface do usuário foi desenvolvida usando **React Native** e o aplicativo possui três telas principais: **HomeScreen**, **NovaTarefaScreen**, e **EditarTarefaScreen**.

#### 🏠 HomeScreen
- Exibe a lista de tarefas.
- Permite adicionar novas tarefas, editar ou excluir tarefas existentes.
- Quando o usuário edita ou exclui uma tarefa, a lista é automaticamente atualizada.

#### ➕ NovaTarefaScreen
- Permite ao usuário adicionar uma nova tarefa.
- O usuário pode definir a descrição e o status da tarefa (pendente ou concluída).
- Após a tarefa ser criada com sucesso, o usuário é redirecionado para a tela inicial, onde a lista de tarefas é atualizada automaticamente.

#### ✏️ EditarTarefaScreen
- Permite ao usuário editar uma tarefa existente.
- Quando a tarefa é atualizada com sucesso, a lista de tarefas é recarregada automaticamente na **HomeScreen**.

## 🔧 O que foi alterado e por quê

### 🔄 Atualização da Lista de Tarefas Após Edição e Criação

Uma das mudanças importantes foi a **atualização automática da lista de tarefas** na tela inicial (`HomeScreen`) após uma tarefa ser editada ou criada. Inicialmente, a lista não era atualizada automaticamente quando o usuário retornava da tela de edição ou criação. Para resolver esse problema, a função responsável por listar as tarefas (`listarTarefas`) foi **passada como parâmetro** para as telas de edição e criação. Assim, após uma tarefa ser criada ou atualizada, essa função é chamada para recarregar a lista na tela inicial.

#### Como foi feito:

- **HomeScreen**:
  - Quando o usuário clica no botão de **Editar** ou **Adicionar Nova Tarefa**, passamos a função `listarTarefas` para as telas de edição e criação.
  
- **NovaTarefaScreen**:
  - Após a criação de uma nova tarefa, a função `listarTarefas` é chamada para garantir que a lista de tarefas seja recarregada na tela inicial.

- **EditarTarefaScreen**:
  - Após a atualização de uma tarefa, a função `listarTarefas` é chamada (caso tenha sido passada como parâmetro) para atualizar a lista de tarefas na tela inicial.
  - A navegação é retornada para a tela anterior após a atualização.

### 🆕 Adição de Função de Criação de Tarefas

A tela **NovaTarefaScreen** foi implementada para permitir a criação de novas tarefas. Nessa tela, o usuário pode inserir a descrição e o status da tarefa. Após a tarefa ser criada, o usuário é redirecionado de volta para a tela inicial, onde a lista de tarefas é automaticamente recarregada.

### 🌐 Uso de Axios para Comunicação com o Backend

A comunicação com o servidor backend foi feita utilizando o **Axios**, uma biblioteca popular para realizar requisições HTTP. O Axios foi utilizado tanto para obter a lista de tarefas, como para adicionar, atualizar e excluir tarefas no servidor.

## 🏁 Considerações Finais

Este projeto demonstra um simples **gerenciador de tarefas** com funcionalidades básicas de CRUD (Criar, Ler, Atualizar e Excluir), utilizando **React Native** para o frontend e **Express.js** para o backend. As melhorias implementadas, como a atualização automática da lista de tarefas após a criação ou edição, melhoraram a experiência do usuário e garantem que a interface sempre reflita o estado atual das tarefas.

### 🚀 Melhorias Futuras

- Implementar persistência de dados no backend usando um banco de dados real (em vez de armazenar as tarefas em memória).
- Adicionar autenticação de usuário para que as tarefas sejam associadas a usuários específicos.
- Melhorar a interface de usuário com mais opções de personalização, como filtros e categorias de tarefas.
