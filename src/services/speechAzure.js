// // cognitiveservices-speech
import * as FileSystem from 'expo-file-system';
import { Audio } from 'expo-av';
import { VPS_TTS } from '@env';

/**
 * Guarda el archivo de audio en el dispositivo de forma temporal
 * y lo reproduce con el reproductor de audio del dispositivo
 * @param {*} text 
 */
const speechAzure = async (text) => {
    
    text = text.replace(/ /g, "%20");

    // Obtener el archivo de audio
    // const url = `http://192.168.1.127:3000/convert?text=${text}`;
    const url = `${VPS_TTS}/convert?text=${text}`;
    
    
    console.log(`Obteniendo el archivo de audio de: ${url}`)
    const { uri } = await FileSystem.downloadAsync(
        url,
        FileSystem.documentDirectory + 'audio.mp3'
    );
    console.log(`Archivo de audio guardado en: ${uri}`)

    // Reproducir el archivo de audio
    const soundObject = new Audio.Sound();
    // set audio volume
    soundObject.setVolumeAsync(1.0);

    try {
        await soundObject.loadAsync({ uri: uri });
        await soundObject.playAsync();
        // Your sound is playing!
    }
    catch (error) {
        // An error occurred!
        console.log(error)
    }


}

export { speechAzure };
