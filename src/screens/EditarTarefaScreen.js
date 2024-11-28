// src/screens/EditarTarefaScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import axios from 'axios';
import { useNavigation, useRoute } from '@react-navigation/native';

const EditarTarefaScreen = () => {
  const { tarefaId, atualizarTarefas } = useRoute().params;  // Pegando os parâmetros da navegação
  const [descricao, setDescricao] = useState('');
  const [status, setStatus] = useState('');
  const navigation = useNavigation();

  const API_URL = 'http://10.68.152.136:3000/tarefas'; // Altere para o IP do seu servidor

  // Carregar a tarefa para edição
  useEffect(() => {
    const carregarTarefa = async () => {
      try {
        console.log('Carregando tarefa com ID:', tarefaId); // Adicionando log para verificar o ID
        const response = await axios.get(`${API_URL}/${tarefaId}`);  // GET para carregar a tarefa com ID
        setDescricao(response.data.descricao);
        setStatus(response.data.status);
      } catch (error) {
        console.error('Erro ao carregar tarefa:', error.response ? error.response.data : error);
        Alert.alert('Erro', 'Não foi possível carregar a tarefa para edição.');
      }
    };

    carregarTarefa();
  }, [tarefaId]);  // Adicionando tarefaId como dependência do useEffect

  // Função para atualizar a tarefa
  const atualizarTarefa = async () => {
    if (!descricao || !status) {
      Alert.alert('Erro', 'Todos os campos devem ser preenchidos!');
      return;
    }

    try {
      console.log('Atualizando tarefa com ID:', tarefaId); // Verificando qual ID está sendo enviado
      const response = await axios.put(`${API_URL}/${tarefaId}`, { descricao, status });  // Envia PUT
      console.log('Tarefa atualizada:', response.data);  // Log do resultado
      Alert.alert('Sucesso', 'Tarefa atualizada com sucesso!');

      // Atualiza a lista de tarefas na HomeScreen
      if (atualizarTarefas) {
        atualizarTarefas();  // Chama a função para atualizar a lista de tarefas
      }

      navigation.goBack();  // Volta para a tela anterior após atualização
    } catch (error) {
      console.error('Erro ao atualizar tarefa:', error.response ? error.response.data : error);
      Alert.alert('Erro', 'Não foi possível atualizar a tarefa. Verifique se a tarefa existe.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar Tarefa</Text>
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
      <Button title="Atualizar Tarefa" onPress={atualizarTarefa} />
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

export default EditarTarefaScreen;
