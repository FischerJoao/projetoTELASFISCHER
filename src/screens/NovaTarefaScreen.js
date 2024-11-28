// src/screens/NovaTarefaScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import axios from 'axios';

const NovaTarefaScreen = ({ route, navigation }) => {
  const [descricao, setDescricao] = useState('');
  const [status, setStatus] = useState('pendente');

  const API_URL = 'http://10.68.152.136:3000/tarefas'; // URL do servidor

  // Função para adicionar tarefa
  const adicionarTarefa = async () => {
    if (!descricao) {
      Alert.alert('Erro', 'A descrição da tarefa é obrigatória!');
      return;
    }

    try {
      const novaTarefa = { descricao, status };
      // Enviar a requisição para adicionar a nova tarefa
      const response = await axios.post(API_URL, novaTarefa); // Envia a tarefa para a API
      const tarefaAdicionada = response.data;

      // Chamar a função `atualizarTarefas` passada via navegação
      if (route.params && route.params.atualizarTarefas) {
        route.params.atualizarTarefas(); // Atualiza as tarefas na tela Home
      }

      // Voltar para a tela anterior
      navigation.goBack();
    } catch (error) {
      console.error('Erro ao adicionar tarefa:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Adicionar Nova Tarefa</Text>
      <TextInput
        style={styles.input}
        placeholder="Descrição da tarefa"
        value={descricao}
        onChangeText={setDescricao}
      />
      <TextInput
        style={styles.input}
        placeholder="Status"
        value={status}
        onChangeText={setStatus}
      />
      <Button title="Adicionar Tarefa" onPress={adicionarTarefa} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
});

export default NovaTarefaScreen;
