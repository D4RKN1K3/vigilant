import React, { useState } from 'react'
import {SafeAreaView, StyleSheet, TextInput,Button, Text, View, Pressable } from 'react-native';
import { login } from '../services/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Se debe pasar el parametro {navigation} a la vista para poder usar el navigation.navigate() y cambiar de vista
const Login = ( {navigation} ) => {

	// Crear variables de estado para guardar los datos ingresados en los inputs
  	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	// error message
	const [error, setError] = useState('');

	// Guardar el usuario en el AsyncStorage
	async function storeUser(value) {
        try {
            const jsonValue = JSON.stringify(value)
            await AsyncStorage.setItem('@user', jsonValue)
        } catch (e) {
            // saving error
            console.log(e)
        }
		console.log("Usuario guardado")
    }

	async function handleLogin() {
		// Llamar a la funcion login() para iniciar sesion
		let response = await login(email, password)

		// Verificar si hay error 400
		if (response.status === 400 || response.error === 'invalid credentials') {
			console.log("Error 400");
			setError('Usuario o contraseña incorrectos ' + response.error)

			// timeout para que el mensaje de error desaparezca
			setTimeout(() => {
				setError('')
			}, 3000);

			return;
		}

		// Verificar si hay error 500
		if (response.status === 500) {
			console.log("Error 500");
			setError('Error de servidor')

			// timeout para que el mensaje de error desaparezca
			setTimeout(() => {
				setError('')
			}
			, 3000);

			return;
		}
        console.log("Usuario logeado")

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
				Iniciar Sesión
			</Text>
			
			{error ? <Text style={styles.alertdanger}>{error}</Text> : null}

			<TextInput
				style={styles.input}
				placeholder='Correo'
				keyboardType="email-address"
				onChangeText={(text) => setEmail(text)}
				value={email}
			/>

			<TextInput
				style={styles.input}
				placeholder='Contraseña'
				keyboardType="default"
				secureTextEntry={true}
				onChangeText={(text) => setPassword(text)}
				value={password}
			/>

			<Pressable style={styles.button}>
				<Button
					title="Ingresar"
					color={"#ff9519"}
					onPress={handleLogin}
				/>   
			</Pressable>

			{/* Separador -o- */}
			<View style={{flexDirection: 'row', justifyContent: 'center', marginTop: '5%' ,alignItems: 'center', marginVertical:'5%', marginHorizontal:'5%'}}>
				<View style={{width: '30%', height: 1, backgroundColor: 'black'}} />
				<Text style={{width: '20%', textAlign: 'center'}}> o </Text>
				<View style={{width: '30%', height: 1, backgroundColor: 'black'}} />
			</View>

			<Text style={styles.text} >
				Olvidaste tu contraseña?
			</Text>

			<Pressable style={styles.button}>
				<Button
					title="Recuperar contraseña"
					color={"#414bb2"}
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
		height: 40,
		margin: 12,
		borderWidth: 1,
		padding: 10,
		marginTop: '10%',
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
	text: {
		textAlign: 'center',
	},
	alertdanger: {
		textAlign: 'center',
		color: 'white',
		backgroundColor: 'red',
		borderRadius: 3,
		padding: 5,

	},
	
});

export default Login
