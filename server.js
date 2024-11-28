const express = require('express');
const app = express();
const port = 3000;

const cors = require('cors');
app.use(cors()); // Permite todas as origens

// Middleware para ler o corpo da requisição como JSON
app.use(express.json());

// Array para armazenar as tarefas em memória
let tarefas = [];
let idCounter = 1; // Contador para gerar IDs únicos

// Endpoint para adicionar uma nova tarefa
app.post('/tarefas', (req, res) => {
    const { descricao, status } = req.body;

    // Verifica se a descrição foi fornecida
    if (!descricao) {
        return res.status(400).json({ mensagem: 'Descrição da tarefa é obrigatória.' });
    }

    const novaTarefa = {
        id: idCounter++,
        descricao,
        status: status || 'pendente', // Status padrão é 'pendente'
    };

    tarefas.push(novaTarefa);
    console.log('Tarefa criada:', novaTarefa); // Adicionando log para depuração
    res.status(201).json(novaTarefa);
});

// Endpoint para listar todas as tarefas
app.get('/tarefas', (req, res) => {
    console.log('Tarefas disponíveis:', tarefas);  // Adicionando log para depuração
    res.json(tarefas);
});

// Endpoint para obter uma tarefa específica pelo ID
app.get('/tarefas/:id', (req, res) => {
    const { id } = req.params;
    const tarefa = tarefas.find(tarefa => tarefa.id == id);

    if (!tarefa) {
        return res.status(404).json({ mensagem: 'Tarefa não encontrada.' });
    }

    res.json(tarefa);
});

// Endpoint para atualizar uma tarefa existente
app.put('/tarefas/:id', (req, res) => {
    const { id } = req.params;
    console.log('Atualizando tarefa com ID:', id); // Adicionando log para verificar o ID recebido
    const { descricao, status } = req.body;

    const tarefaIndex = tarefas.findIndex(tarefa => tarefa.id == id); // Comparação flexível para garantir que o ID seja encontrado.

    if (tarefaIndex === -1) {
        console.log('Tarefa não encontrada para o ID:', id);
        return res.status(404).json({ mensagem: 'Tarefa não encontrada.' });
    }

    tarefas[tarefaIndex].descricao = descricao || tarefas[tarefaIndex].descricao;
    tarefas[tarefaIndex].status = status || tarefas[tarefaIndex].status;

    console.log('Tarefa atualizada:', tarefas[tarefaIndex]);  // Log da tarefa atualizada
    res.json(tarefas[tarefaIndex]);
});

// Endpoint para excluir uma tarefa
app.delete('/tarefas/:id', (req, res) => {
    const { id } = req.params;
    const tarefaIndex = tarefas.findIndex(tarefa => tarefa.id == id);

    if (tarefaIndex === -1) {
        return res.status(404).json({ mensagem: 'Tarefa não encontrada.' });
    }

    tarefas.splice(tarefaIndex, 1);
    res.status(204).send();
});

// Inicia o servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
