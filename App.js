import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View , Image,Button, Alert, Pressable } from 'react-native';
import Main from './src/components/Main.jsx';
import Logo from './src/components/logo.jsx';
import Botones from './src/components/botones.jsx';

export default function App() {
  return (
    <><Main />
      
      <Logo />
      <Botones />

      
    
    </>
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
