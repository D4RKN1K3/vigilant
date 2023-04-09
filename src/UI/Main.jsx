import React from 'react'
import { Text, View, Image, Button,Pressable, StyleSheet } from 'react-native'
import Constants from 'expo-constants'
import Botones from '../components/botones'
import Logo from '../components/logo'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

// Se debe pasar el parametro {navigation} a la vista para poder usar el navigation.navigate() y cambiar de vista
const Main = ( {navigation} ) => {

    // Verificar si hay un usuario logeado
    useEffect( () => {
        
        const checkUser = async () => {
            try {
                console.log('Verificando usuario');
                const user = await AsyncStorage.getItem('@user');
                const userJson = user!=null ? JSON.parse(user) : null;

                if (userJson) {
                    navigation.navigate('Home');
                }
                
            } catch (error) {
                console.log(error);
            }
        }
        
        checkUser();

    }, []);
    



    return (
        // Centrar verticalmente la vista
        <View style={ {marginTop: Constants.statusBarHeight,
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
         }  }>
            
            <View style={styles.logo}>
                <Logo/>
            </View>
            
            <Pressable style={styles.button}> 
                <Button 
                    title="Inicar Sesion"
                    color="#f5bc0c"
                    onPress={() => navigation.navigate('Login')}
                />
            </Pressable>

            <Pressable style={styles.button}> 
                <Button 
                    title="Registrarse"
                    color="#f5bc0c"
                    onPress={() => navigation.navigate('Register')}
                />
            </Pressable>

        </View>
    )
}

export default Main

const styles = StyleSheet.create({
    button: {
        marginTop: '5%',
        width: '50%',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    logo: {
        marginBottom: '20%',
    },
});
    
