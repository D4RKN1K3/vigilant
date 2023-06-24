import React from 'react';
import { View, BackHandler, Alert, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import Boton from '../components/Boton';
import Logo from '../components/Logo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';
import { useIsFocused } from "@react-navigation/native";

// Se debe pasar el parametro {navigation} a la vista para poder usar el navigation.navigate() y cambiar de vista
const Main = ( {navigation} ) => {
    // Verificar si la vista esta enfocada
    const isFocused = useIsFocused();

    // Verificar si hay un usuario logeado
    useEffect( () => {
        
        const checkUser = async () => {
            try {
                console.log('Verificando usuario');
                const user = await AsyncStorage.getItem('@user');
                const userJson = user!=null ? JSON.parse(user) : null;

                if (userJson) {
                    console.log('Usuario encontrado');
                    console.log(userJson);
                    // remover usuario
                    // await AsyncStorage.removeItem('@user');
                    navigation.navigate('Home');
                }
                
            } catch (error) {
                console.log(error);
            }
        }
        
        checkUser();

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
