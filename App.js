import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { StyleSheet, Text, View , Image,Button, Alert, Pressable } from 'react-native';
import Main from './src/components/Main.jsx';
import Logo from './src/components/logo.jsx';
import Botones from './src/components/botones.jsx';
import { AUTHENTICATION_API_URL } from '@env';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

console.log(AUTHENTICATION_API_URL)

export default function App() {
  return (
    <NavigationContainer>
      <Rutas/>
    </NavigationContainer>
  );
}

function Rutas() {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen name="Main" component={Main} />

    </Stack.Navigator>
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
