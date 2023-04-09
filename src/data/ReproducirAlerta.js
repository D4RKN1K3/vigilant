import {Audio, Video} from 'expo-av';
//importar alarma.mp3 de assets/sounds/alarma.mp3 en carpeta superior 
import sonidoAlarma from '../../assets/sounds/alarm.mp3';
import { Alert } from 'react-native';
import * as React from 'react';



async function playSound(){
    const  setSound = React.useState();
    console.log('Loading Sound');
    const { sound } = await Audio.Sound.createAsync( sonidoAlarma );
    console.log('Playing Sound');
    setSound(sound);
    await sound.playAsync();

}

function reproducirAlarma(remoteMessage){
    playSound();
    Alert.alert('Una alerta a llegado!', remoteMessage.notification.body);
}

export { reproducirAlarma }