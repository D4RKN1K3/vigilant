import React, { useState } from 'react'
import {SafeAreaView, StyleSheet, TextInput, Text} from 'react-native';
import { login } from '../services/users/auth';
import Boton from '../components/Boton';
import Separador from '../components/Separador';
import Titulo from '../components/Titulo';
import Spinner from '../components/Spinner';



// Se debe pasar el parametro {navigation} a la vista para poder usar el navigation.navigate() y cambiar de vista
const Login = ( {navigation} ) => {

	// Crear variables de estado para guardar los datos ingresados en los inputs
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState(''); // Error message
	const [spinner, setSpinner] = useState(false);

	async function handleLogin() {
		// Mostrar spinner
		setSpinner(true);
		let response;
		// Llamar a la funcion login() para iniciar sesion
		try {
			response = await login(email.toLowerCase(), password);
		}
		catch (error) {
			console.log(error);
			setError('Hubo un error con la conexión al servidor');
			setSpinner(false);
			return;
		}
		
		// Ocultar spinner
		setSpinner(false);

		// Verificar si hay error 400
		if (response.errors) {
			console.log("Error 400");
			
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
		
		// Cambiar de vista a Main
		navigation.navigate('Home')
	}

	// Show spinner
	if(spinner){
		return <Spinner />
	}

	return (
		<SafeAreaView style={styles.container}>

			<Titulo> Iniciar Sesión </Titulo>
			
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

			<Boton title="Ingresar" onPress={handleLogin} color={"#ff9519"} />

			<Separador />
			
			<Text style={styles.text}>
				Olvidaste tu contraseña?
			</Text>

			<Boton title="Recuperar contraseña" onPress={() => {}} color={"#414bb2"} />

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
