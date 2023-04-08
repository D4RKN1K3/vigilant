import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View , Image,Button, Alert, Pressable } from 'react-native';
import React, { useEffect } from 'react'
import Main from './src/components/Main.jsx';
import Logo from './src/components/logo.jsx';
import Botones from './src/components/botones.jsx';
import messaging from '@react-native-firebase/messaging';
import { AUTHENTICATION_API_URL } from '@env';
import SoundPlayer from 'react-native-sound-player'
console.log(AUTHENTICATION_API_URL);

export default function App() {
  

    const requestUserPermission = async () => {
        const authStatus = await messaging().requestPermission();
        const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

        if (enabled) {
            console.log('Authorization status:', authStatus);
        }
    }

    useEffect(() => {
        if( requestUserPermission() ){
            messaging().getToken().then(token => {
                console.log(token)
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
          });

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

    

    

    return (
        <><Main />
        
        <Logo />
        <Botones />
        
        
        </>
    );
}