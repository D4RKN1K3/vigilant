import React, { useState } from 'react';
import { Text, View, StyleSheet, BackHandler, Alert } from 'react-native';
import Constants from 'expo-constants';
import Boton from '../components/Boton';
import PanicButton from '../components/PanicButton';
import { useFocusEffect } from "@react-navigation/native";
import { validateUser, removeUser } from '../services/users/auth.js';
import 'react-native-get-random-values';
import Spinner from '../components/Spinner';

/**
 * Crea la vista de Home (Inicio), donde se encuentra el boton de panico y el boton de cerrar sesion
 * @param {*} props Parametros: navigation
 * @returns Componente Home
 */
const Home = ( {navigation} ) => {

    // USER
    const [user, setUser] = useState(null);

    // Verificar si hay un usuario logeado
    useFocusEffect(
        React.useCallback(() => {
            const getUserFromApi = async () => {
                setUser(await validateUser(navigation));
            }
            getUserFromApi();
            
            const backAction = () => {
                if (navigation.isFocused()) {
                    Alert.alert("¡Espera!", "¿Estás seguro que quieres cerrar sesión?", [
                    {
                        text: "Cancelar",
                        onPress: () => null,
                        style: "cancel"
                    },
                    { text: "Sí", onPress: () => logout() }
                    ]);
                    return true;
                }
            };
            
            const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
            );
        }, [])
    );

    /**
     * Cerrar sesion y cambiar a la vista de Main
     */
    const handleLogout = async () => {
        if( removeUser() ){
            setUser(null);
            navigation.navigate('Main');
        }
    }
    
    /**
     * Cambiar a la vista de Alertas
     */
    const handleVerAlertas = async () => {
        navigation.navigate('Alertas');
    }

    const styles = StyleSheet.create({
        container: {
            marginTop: Constants.statusBarHeight,
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
        },
        mainTitle: {
            fontSize: 20,
            fontWeight: 'bold',
            textAlign: 'center',
            marginTop: 10,
            color: '#333',
        },
    });


    return (
        // Centrar verticalmente la vista
        <View style={styles.container}>
            {user ? (
            <View>

                {user && <Text style={styles.mainTitle}>Bienvenido(a) {user.nombre}</Text>}

                <PanicButton />

                <Boton title="Cerrar Sesion" onPress={handleLogout} color="#ce0a0a" />

                <Boton title="Ver Alertas" onPress={handleVerAlertas} />

            </View>
            ):(
                <Spinner />
            )}
        </View>
    )


}

export default Home