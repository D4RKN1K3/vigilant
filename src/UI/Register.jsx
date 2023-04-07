import React, {useState} from 'react'
import {SafeAreaView, StyleSheet, TextInput,Button, Text, View, Pressable} from 'react-native';
import {register} from '../services/auth';

// Se debe pasar el parametro {navigation} a la vista para poder usar el navigation.navigate() y cambiar de vista

const Registro = ( {navigation} ) => {

    // Crear variables de estado para guardar los datos ingresados en los inputs
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [nombre, setNombre] = useState('');
    const [direccion, setDireccion] = useState('');
    // error message
    const [error, setError] = useState('');
    
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

        // Obtener token
        let token = response.token;
        console.log(token)

        // Cambiar de vista a Main
        navigation.navigate('Main')
    }


    return (
        <SafeAreaView>

            <Text style={styles.texto} >
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

            <Pressable style={styles.bt}>
				<Button
					title="Registrarse"
					color={"#ff9519"}
					onPress={handleRegister}
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
        marginTop: '15%',
    },
    texto: {
        fontSize: 40,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    bt: {
        width: '50%',
        height: '20%',
        marginLeft: '25%',
        marginTop: '10%',
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
