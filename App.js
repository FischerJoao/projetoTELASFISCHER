// Exemplo no App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen'; // Caminho correto
import NovaTarefaScreen from './src/screens/NovaTarefaScreen';
import EditarTarefaScreen from './src/screens/EditarTarefaScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="NovaTarefa" component={NovaTarefaScreen} />
        <Stack.Screen name="EditarTarefa" component={EditarTarefaScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
