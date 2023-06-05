import {Audio} from 'expo-av';
import { useRef } from 'react';



const playAlarm = async ( soundAlarm, setSoundAlarm ) => {
    
    // VErificar si el sonido está cargado
    if( soundAlarm ){
        console.log(soundAlarm)
        if( !soundAlarm.status.isPlaying ){
            // Reproducir el sonido
            await soundAlarm.sound.playAsync()
            console.log("Reproduciendo el sonido!!!!!!")
        }else{
            console.log("El sonido Ya esta sonando!!!!!!")
        }
    }else{
        // Cargar el sonido
        const soundLoaded = await Audio.Sound.createAsync( require('../../assets/sounds/alarm.mp3') )
        console.log(soundLoaded)

        soundLoaded.sound.setOnPlaybackStatusUpdate( (playbackStatus) => {
            playbackStatus.isPlaying = true

            if( playbackStatus.didJustFinish ){
                playbackStatus.isPlaying = false
                // console.log("Ya  termino el sonido!!!!!!")
            }
            // console.log(playbackStatus)
            // console.log(soundLoaded.status)
            // console.log("--------------------------")
        });

        // Guardar el sonido
        setSoundAlarm( soundLoaded )
        // Reproducir el sonido
        await soundLoaded.sound.setVolumeAsync(0.01);
        await soundLoaded.sound.playAsync()

    }

}



export {playAlarm};