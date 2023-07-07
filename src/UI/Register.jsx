import React, {useState} from 'react'
import {SafeAreaView, StyleSheet, TextInput, Text} from 'react-native';
import {register} from '../services/users/auth';
import Boton from '../components/Boton';
import Titulo from '../components/Titulo';
import Spinner from '../components/Spinner';

/**
 * Crea la vista de Registro
 * @param {*} props Parametros: navigation
 * @returns Componente Registro
 */
const Registro = ( {navigation} ) => {

    // Crear variables de estado para guardar los datos ingresados en los inputs
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [nombre, setNombre] = useState('');
    const [direccion, setDireccion] = useState('');
    // error message
    const [error, setError] = useState('');
    const [spinner, setSpinner] = useState(false);
    
    /**
     * Manejar el registro de un usuario en la vista de Registro
     */
    async function handleRegister() {
        // Mostrar spinner
        setSpinner(true);

        // Llamar a la funcion register() para iniciar sesion
        let response;
        
        try {
            response = await register(email.toLowerCase(), password, nombre, direccion)
        } catch (error) {
            console.log(error);
            // Ocultar spinner y mostrar error
            setError('Hubo un error con la conexión al servidor');
            setSpinner(false);
            return;
        }

        // Ocultar spinner
        setSpinner(false);

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

        // Cambiar de vista a Main
        navigation.navigate('Home')
    }

    const styles = StyleSheet.create({
        registroContainer: {
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

    if(spinner) {
        return <Spinner />
    }

    return (
        <SafeAreaView style={styles.registroContainer}>

            <Titulo> Registrarse </Titulo>
            
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

            <Boton title="Registrarse" onPress={handleRegister} />
            
        </SafeAreaView>
    );
};

export default Registro
