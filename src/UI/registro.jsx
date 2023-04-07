import React from 'react'
import {SafeAreaView, StyleSheet, TextInput,Button, Text, View} from 'react-native';

// Se debe pasar el parametro {navigation} a la vista para poder usar el navigation.navigate() y cambiar de vista

const Registro = ( {navigation} ) => {
  return (
    <SafeAreaView>

        <Text style={styles.texto} >
            Registrarse
        </Text>

        <TextInput
            style={styles.input}
            placeholder='Email'
            keyboardType="email-address"
        />
        <TextInput
            style={styles.input}
            placeholder='Contraseña'
            keyboardType="default"
        />
        <TextInput
            style={styles.input}
            placeholder="Nombre Completo"
            keyboardType="default"
        />
        <TextInput
            style={styles.input}
            placeholder="Dirección"
            keyboardType="default"
        />

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
    marginTop: '15%',
  },
  texto: {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Registro
