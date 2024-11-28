// src/screens/HomeScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, Alert, StyleSheet } from 'react-native';
import axios from 'axios';

const HomeScreen = ({ navigation }) => {
  const [tarefas, setTarefas] = useState([]);
  const API_URL = 'http://10.68.152.136:3000/tarefas'; // URL do servidor

  // Função para listar tarefas
  const listarTarefas = async () => {
    try {
      const response = await axios.get(API_URL);  // Endpoint GET
      setTarefas(response.data);
    } catch (error) {
      console.error('Erro ao listar tarefas:', error);
    }
  };

  // Função para excluir tarefa
  const excluirTarefa = async (tarefaId) => {
    try {
      await axios.delete(`${API_URL}/${tarefaId}`);  // Endpoint DELETE
      setTarefas(tarefas.filter(tarefa => tarefa.id !== tarefaId));
      Alert.alert('Sucesso', 'Tarefa excluída com sucesso!');
    } catch (error) {
      console.error('Erro ao excluir tarefa:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao excluir a tarefa.');
    }
  };

  useEffect(() => {
    listarTarefas(); // Carrega as tarefas ao iniciar a tela
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gerenciador de Tarefas</Text>
      <Button
        title="Adicionar Nova Tarefa"
        onPress={() => {
          // Navegar para a tela NovaTarefa, passando a função de atualizar tarefas
          navigation.navigate('NovaTarefa', { atualizarTarefas: listarTarefas });
        }}
      />
      <FlatList
        data={tarefas}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.descricao} - {item.status}</Text>
            <Button
              title="Editar"
              onPress={() => {
                navigation.navigate('EditarTarefa', {
                  tarefaId: item.id, // Passa o ID da tarefa para edição
                  atualizarTarefas: listarTarefas  // Passa a função de atualizar a lista
                });
              }}
            />
            <Button
              title="Excluir"
              onPress={() => excluirTarefa(item.id)} // Chama a função para excluir
            />
          </View>
        )}
      />
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
  item: {
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 5,
  },
});

export default HomeScreen;
