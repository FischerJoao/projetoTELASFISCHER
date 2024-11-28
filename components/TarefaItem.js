// src/components/TarefaItem.js
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const TarefaItem = ({ tarefa, onEditar, onExcluir }) => {
    return (
        <View style={styles.item}>
            <Text>{tarefa.descricao} - {tarefa.status}</Text>
            <Button title="Editar" onPress={onEditar} />
            <Button title="Excluir" onPress={onExcluir} />
        </View>
    );
};

const styles = StyleSheet.create({
    item: {
        padding: 10,
        marginBottom: 10,
        borderWidth: 1,
        borderRadius: 5,
    },
});

export default TarefaItem;
