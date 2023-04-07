import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { StyleSheet, Text, View , Image,Button, Alert, Pressable } from 'react-native';
import Rutas from './src/routes/Rutas.jsx'; // Importamos las rutas
import { AUTHENTICATION_API_URL } from '@env';
import {NavigationContainer} from '@react-navigation/native';

console.log(AUTHENTICATION_API_URL)

export default function App() {
  return (
    // Este contenedor es necesario para navegar entre pantallas
    <NavigationContainer>
      {/* LLamamos a las rutas */}
      <Rutas/>
    </NavigationContainer>
  );
}








/*  Como definir estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    fontSize: 20,
  },

});
*/
