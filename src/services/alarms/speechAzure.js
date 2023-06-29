// // cognitiveservices-speech
import * as FileSystem from 'expo-file-system';
import { Audio } from 'expo-av';
import { VPS_TTS } from '@env';

/**
 * Reproduce el audio de Azure
 * @param {*} text 
 */
const speechAzure = async (text) => {
    
    // Verificar

    // Verificar si el texto está vacio
    if( text.trim() === '' ){
        return;
    }

    // Reemplazar los espacios por %20
    text = text.replace(/ /g, "%20");

    // Obtener el archivo de audio
    // const url = `http://192.168.1.127:3000/convert?text=${text}`;
    const url = `${VPS_TTS}/convert?text=${text}`;    
    
    // Play the sound with Expo's audio API
    const { sound } = await Audio.Sound.createAsync(
        { uri: url },
        { shouldPlay: true }
    );

    await sound.playAsync();
    // Your sound is playing!
    console.log("Reproduciendo el sonido!!!!!!")

}

export { speechAzure };
