import React, {useState} from 'react'
import {SafeAreaView, StyleSheet, TextInput,Button, Text, View, Pressable} from 'react-native';
import {register} from '../services/auth';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Se debe pasar el parametro {navigation} a la vista para poder usar el navigation.navigate() y cambiar de vista

const Registro = ( {navigation} ) => {

    // Crear variables de estado para guardar los datos ingresados en los inputs
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [nombre, setNombre] = useState('');
    const [direccion, setDireccion] = useState('');
    // error message
    const [error, setError] = useState('');
    const [FCMToken, setFCMToken] = useState('');
    
    async function handleRegister() {
        // Llamar a la funcion register() para iniciar sesion
        let response = await register(email.toLowerCase(), password, nombre, direccion)

        console.log(response)

        // Verificar si hay errores
        if (response.errors) {
            console.log("Error 403 o hay errores");
            console.log(response);

            // error mensaje
            let errorMessage = "Hay algunos errores:";

            // Obtener errores
            let errores = response.errors;

            for (let i = 0; i < errores.length; i++) {
                errorMessage += "\nEl campo " + errores[i].path + " "+ errores[i].msg.toLowerCase();
            }

            // Mostrar error
            setError(errorMessage)

            // timeout para que el mensaje de error desaparezca
            setTimeout(() => {
                setError('')
            }
            , 3000*errores.length);

            return;
        }

        console.log("Usuario registrado exitosamente");

        // Cambiar de vista a Main
        navigation.navigate('Home')
    }

    return (
        <SafeAreaView style={styles.container}>

            <Text style={styles.title} >
                Registrarse
            </Text>

            {error ? <Text style={styles.alertdanger}>{error}</Text> : null}

            <TextInput
                style={styles.input}
                placeholder='Email'
                keyboardType="email-address"
                onChangeText={text => setEmail( text )}
                value={email}
            />
            <TextInput
                style={styles.input}
                placeholder='Contraseña'
                keyboardType="default"
                onChangeText={text => setPassword(text)}
                value={password}
                secureTextEntry={true}
            />
            <TextInput
                style={styles.input}
                placeholder="Nombre Completo"
                keyboardType="default"
                onChangeText={text => setNombre(text)}
                value={nombre}
            />
            <TextInput
                style={styles.input}
                placeholder="Dirección"
                keyboardType="default"
                onChangeText={text => setDireccion(text)}
                value={direccion}
            />

            <Pressable style={styles.button}>
				<Button
					title="Registrarse"
					color={"#ff9519"}
					onPress={handleRegister}
				/>   
			</Pressable>
            
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
		flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
	},
    input: {
        height: 50,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        marginTop: '5%',
    },
    title: {
        fontSize: 40,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: '10%',
    },
    button: {
        marginTop: '5%',
        width: '50%',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    alertdanger: {
		textAlign: 'center',
		color: 'white',
		backgroundColor: 'red',
		borderRadius: 3,
		padding: 5,
	},
});

export default Registro
