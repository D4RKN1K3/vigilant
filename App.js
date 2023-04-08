import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { StyleSheet, Text, View , Image,Button, Alert, Pressable, Platform } from 'react-native';
import Rutas from './src/routes/Rutas.jsx'; // Importamos las rutas
import { AUTHENTICATION_API_URL } from '@env';
import {NavigationContainer} from '@react-navigation/native';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';
import { subscribe } from './src/services/notification.js';

console.log(AUTHENTICATION_API_URL)

export default function App() {

    // Guardar el token en el server 
    const requestUserPermission = async () => {
        const authStatus = await messaging().requestPermission();
        const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

        if (enabled) {
            console.log('Authorization status:', authStatus);
        }
    }

    if (Platform.OS === 'android') {

        useEffect(() => {
            if( requestUserPermission() ){
                messaging().getToken().then(token => {
                    console.log(token)
                    subscribe(token)
                });
            }else {
                console.log('No se pudo obtener el token', authStatus);
            }

            // Check whether an initial notification is available
            messaging()
                .getInitialNotification()
                .then( async (remoteMessage) => {
                    if (remoteMessage) {
                    console.log(
                        'Notification caused app to open from quit state:',
                        remoteMessage.notification,
                    );
                    setInitialRoute(remoteMessage.data.type); // e.g. "Settings"
                    }
                    //el siguiente codigo 
                    setLoading(false);
                }
            );

            // Register foreground handler
            messaging().onNotificationOpenedApp(remoteMessage => {
                console.log(
                    'Notification caused app to open from background state:',
                    remoteMessage.notification,
                );
            });

            // Register background handler
            messaging().setBackgroundMessageHandler(async remoteMessage => {            
                console.log('Message handled in the background!', remoteMessage);
                try {
                    // play the file in the file system (sound.mp3)
                    SoundPlayer.playSoundFile('alarm', 'mp3')
                        
                } catch (e) {
                    console.log(`cannot play the sound file`, e)
                }
            });

            // Register foreground handler
            const unsubscribe = messaging().onMessage(async remoteMessage => {
                Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
            });
        
            return unsubscribe;
    
        }, []);

    }

    return (
        // Este contenedor es necesario para navegar entre pantallas
        <NavigationContainer>
        {/* LLamamos a las rutas */}
        <Rutas/>
        </NavigationContainer>
    );

}