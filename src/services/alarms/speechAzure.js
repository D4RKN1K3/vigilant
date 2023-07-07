// // cognitiveservices-speech
import * as FileSystem from 'expo-file-system';
import { Audio } from 'expo-av';
import { VPS_TTS } from '@env';

/**
 * Mandar una petición al backend para crear un Text to Speech con Azure
 * y lo reproduce
 * @param {*} text Texto a convertir a audio
 * @returns Devuelve el sonido reproducido
 */
const speechAzure = async (text) => {
    
    // Verificar si el texto está vacio
    if( text.trim() === '' ){
        return null;
    }

    // Reemplazar los espacios por %20
    const textTransformed = text.replace(/ /g, "%20");

    // Obtener el archivo de audio
    const url = `${VPS_TTS}/convert?text=${textTransformed}`;    
    
    // Play the sound with Expo's audio API
    const { sound } = await Audio.Sound.createAsync(
        { uri: url },
        { shouldPlay: true }
    );

    await sound.playAsync();
    
    return sound;
}

export { speechAzure };
