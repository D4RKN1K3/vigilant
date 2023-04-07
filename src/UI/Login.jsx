import React, { useState } from 'react'
import {SafeAreaView, StyleSheet, TextInput,Button, Text, View, Pressable } from 'react-native';
import { login } from '../services/auth';
// Se debe pasar el parametro {navigation} a la vista para poder usar el navigation.navigate() y cambiar de vista

const Login = ( {navigation} ) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleLogin() {
    // Imprimir en consola los datos ingresados
    console.log("Login");
    console.log("Email: " + email);
    console.log("Password: " + password);

    // Llamar a la funcion login() para iniciar sesion
    let response = login(email, password)

    // Imprimir en consola el resultado de la funcion login()
    console.log(response)
    
  }

  return (
    <SafeAreaView>

        <Text style={styles.texto} >
            Iniciar Sesión
        </Text>

        <TextInput
            style={styles.input}
            placeholder='Correo'
            keyboardType="email-address"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
        />
        <TextInput
            style={styles.input}
            placeholder='Contraseña'
            keyboardType="default"
            secureTextEntry={true}
            onChange={(e) => setPassword(e.target.value)}
            value={password}
        />

        <Pressable style={styles.bt}>
            <Button
                title="Ingresar"
                color={"#ff9519"}
                onPress={handleLogin}
            />   
        </Pressable>

        <Text style={styles.tx2} >   
            Olvidaste tu contraseña?
        </Text>

        <Pressable style={styles.bt}>
            <Button
                title="Recuperar contraseña"
                color={"#414bb2"}
            />   
        </Pressable>

        <Button
            title="Inicio"
            onPress={() => navigation.navigate('Main')}
        />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    marginTop: '10%',
  },
  texto: {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: '2%',
  },
  bt: {
    width: '50%',
    height: '20%',
    marginLeft: '25%',
    marginTop: '10%',
  },
  tx2: {
    textAlign: 'center',
  },
});

export default Login
