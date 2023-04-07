import React from 'react'
import {SafeAreaView, StyleSheet, TextInput,Button, Text, View, Pressable } from 'react-native';

// Se debe pasar el parametro {navigation} a la vista para poder usar el navigation.navigate() y cambiar de vista

const Autenticacion = ( {navigation} ) => {
  return (
    <SafeAreaView>

        <Text style={styles.texto} >
            Iniciar Sesión
        </Text>

        <TextInput
            style={styles.input}
            placeholder='Correo'
            keyboardType="email-address"
        />
        <TextInput
            style={styles.input}
            placeholder='Contraseña'
            keyboardType="default"
        />

        <Pressable style={styles.bt}>
            <Button
                title="Ingresar"
                color={"#ff9519"}
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

export default Autenticacion
