import React from 'react';
import { View, BackHandler, Alert, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import Boton from '../components/Boton';
import Logo from '../components/Logo';
import { useEffect } from 'react';
import { useIsFocused } from "@react-navigation/native";
import { validateUserMain } from '../services/users/auth.js';

/**
 * Crea la vista de Main (Inicio), donde se encuentra el boton de Iniciar Sesion y el boton de Registrarse
 * @param {*} props Parametros: navigation
 * @returns Componente Main
 */
const Main = ( {navigation} ) => {
    // Verificar si la vista esta enfocada
    const isFocused = useIsFocused();

    // Verificar si hay un usuario logeado
    useEffect( () => {
        
        validateUserMain(navigation);

        const backAction = () => {
            if (navigation.isFocused()) {
                Alert.alert("¡Espera!", "¿Estás seguro que salir?", [
                {
                    text: "Cancelar",
                    onPress: () => null,
                    style: "cancel"
                    },
                    { text: "Sí", onPress: () => BackHandler.exitApp() }
                ]);
                return true;
                }
            };
        
        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );

    }, [isFocused]);
    
    const styles = StyleSheet.create({
        container: {
            marginTop: Constants.statusBarHeight,
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
        },
    });

    return (
        <View style={styles.container}>
            <Logo/>
            <Boton title={'Iniciar Sesion'} onPress={() => navigation.navigate('Login')}/>
            <Boton title={'Registrarse'} onPress={() => navigation.navigate('Register')}/>
        </View>
    )
}

export default Main
