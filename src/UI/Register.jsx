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
    
    async function storeUser(value) {
        try {
            const jsonValue = JSON.stringify(value)
            await AsyncStorage.setItem('@user', jsonValue)
        } catch (e) {
            // saving error
            console.log(e)
        }
    }

    // get FCM token from firebase
    async function getFCMToken() {
        try {
            const token = await messaging().getToken();
            setFCMToken(token);
            console.log("FCM token: ", token);
        } catch (e) {
            console.log(e)
            setFCMToken('');
        }
    }

    async function handleRegister() {
        // Llamar a la funcion register() para iniciar sesion
        let response = await register(email, password, nombre, direccion)

        console.log(response)

        // Verificar si hay error 400
        if (response.status == 400 || response.error == 'faltan datos') {
            
            // error mesaje
            let errorMessage = "Faltan datos:"

            // Obtener errores
            let errores = response.datosFaltantes;

            for (let i = 0; i < errores.length; i++) {
                errorMessage += " " + errores[i];
            }

            // Mostrar error
            setError(errorMessage)

            // timeout para que el mensaje de error desaparezca
            setTimeout(() => {
                setError('')
            }
            , 3000);

            return;
        }

        // Crear objeto usuario
        let usuario = {
            id: response._id,
            nombre: response.name,
            email: response.username,
            direccion: response.address,
            token: response.token
        }
        // Guardar el usuario en el AsyncStorage
        storeUser(usuario)

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
                onChangeText={text => setEmail(text)}
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
