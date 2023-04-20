import {Audio} from 'expo-av';
import sonidoAlarma from '../../assets/sounds/alarm.mp3';

const playAlarm = async () => {
    console.log('Loading Sound');
    const { sound } = await Audio.Sound.createAsync( sonidoAlarma );
    console.log('Playing Sound');
    await sound.playAsync();
}

export {playAlarm};