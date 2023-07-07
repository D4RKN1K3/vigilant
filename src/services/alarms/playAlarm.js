import {Audio} from 'expo-av';
import { useRef } from 'react';

/**
 * Función para reproducir un sonido
 * @param {*} soundAlarm  Sonido a reproducir
 * @param {*} setSoundAlarm  Función para guardar el sonido
 */
const playAlarm = async ( soundAlarm, setSoundAlarm ) => {
    
    // VErificar si el sonido está cargado
    if( soundAlarm ){
        if( !soundAlarm.status.isPlaying ){
            // Reproducir el sonido
            await soundAlarm.sound.playAsync()
        }
    }else{
        // Cargar el sonido
        const soundLoaded = await Audio.Sound.createAsync( require('../../../assets/sounds/alarm.mp3') );

        soundLoaded.sound.setOnPlaybackStatusUpdate( (playbackStatus) => {
            playbackStatus.isPlaying = true

            if( playbackStatus.didJustFinish ){
                playbackStatus.isPlaying = false
            }
        });

        // Guardar el sonido
        setSoundAlarm( soundLoaded )
        // Reproducir el sonido
        await soundLoaded.sound.setVolumeAsync(0.01);
        await soundLoaded.sound.playAsync()

    }

}



export {playAlarm};