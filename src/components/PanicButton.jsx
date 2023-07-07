import React from 'react'
import { useState } from 'react';
import { playAlarm } from '../services/alarms/playAlarm.js';
import { speechAzure } from '../services/alarms/speechAzure.js';
import { newAlert } from '../services/alarms/alert.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, Pressable, StyleSheet } from 'react-native'
import { getUser } from '../services/users/auth.js';


/**
 * Crea el boton de panico
 * @returns Componente Boton de Panico
 */
const PanicButton = () => {

    // setPressed
    const [pressed, setPressed] = useState(false);
    const [soundAlarm, setSoundAlarm] = useState(null);
    const [user, setUser] = useState(null);
    
    //Funcion enviar nueva alerta
    const sendAlert = async () => {

        try {
            const userJson = await getUser();

            setUser(userJson);

            if (!userJson) {
                navigation.navigate('Main');
            }
            try {
                console.log(userJson.token);
                const alert = await newAlert(userJson.token);
                console.log(alert);
            } catch (error) {
                console.log(error);
            }
        } catch (error) {
            console.log(error);
        }
        
    }

    const alertFunction = (soundAlarm,
        setSoundAlarm) => {
        console.log("Alerta enviada");
        sendAlert();
        playAlarm(soundAlarm,setSoundAlarm);
        speechAzure("La alerta ha sido enviada a todos los dispositivos registrados");
    }

    const styles = StyleSheet.create({
        buttonPanicPressed : {width: 175, height: 175,backgroundColor: '#ce0a0a'},
        buttonPanic : {alignItems: 'center', justifyContent: 'center', width: 200, height: 200, 
            backgroundColor: '#de0909', borderRadius: 100, shadowColor: 'black', 
            shadowOffset: {width: 2, height: 5}, shadowOpacity: 1, shadowRadius: 10, elevation: 10,
        },
        textButtonPanic : {fontSize: 20, color: '#fff', fontWeight: 'bold', textAlign: 'center'},
        containerButtonPanic: {alignItems: 'center', justifyContent: 'center', marginTop: '10%', marginBottom: '10%', height: 200},
    });

    return (
        <View style={styles.containerButtonPanic}>

            <Pressable
                style={ [ styles.buttonPanic , pressed ? styles.buttonPanicPressed : styles.buttonPanic] }
                onPress={() => alertFunction(
                    soundAlarm,
                    setSoundAlarm,
                )}
                onPressIn={() => setPressed(true)}
                onPressOut={() => setPressed(false)}
            >
                <Text
                    style={styles.textButtonPanic}
                >{"ACTIVAR ALERTA!"}</Text>
            </Pressable>

        </View>
    )
}




export default PanicButton