import React, {useEffect, useState} from 'react'
import { Text, View, Image, Button,Pressable, StyleSheet,BackHandler, Alert } from 'react-native'
import Constants from 'expo-constants'
import Botones from '../components/botones'
import Logo from '../components/logo'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { newAlert } from '../services/alert.js';
import { useIsFocused } from "@react-navigation/native";
import {getUser} from '../services/auth.js';
import { playAlarm } from '../services/playAlarm.js';

// Se debe pasar el parametro {navigation} a la vista para poder usar el navigation.navigate() y cambiar de vista
const Home = ( {navigation} ) => {

    // USER
    const [user, setUser] = useState(null);
    // boton de panico presionado animacion
    const [pressed, setPressed] = useState(false);
    // Verificar si la vista esta enfocada
    const isFocused = useIsFocused();
    // sound alarm
    const [soundAlarm, setSoundAlarm] = useState(null);


    // Verificar si hay un usuario logeado
    useEffect(() => {

        const getUserFromApi = async () => {
            const user = await getUser();
            setUser(user);
            
        }
        getUserFromApi();
        
        const backAction = () => {
            if (navigation.isFocused()) {
                Alert.alert("¡Espera!", "¿Estás seguro que quieres cerrar sesión?", [
                {
                  text: "Cancelar",
                  onPress: () => null,
                  style: "cancel"
                },
                { text: "Sí", onPress: () => logout() }
              ]);
              return true;
            }
        };
          
        const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
        );

    }, [isFocused]);
    //Funcion enviar nueva alerta
    const sendAlert = async () => {
        try {

            const user = await AsyncStorage.getItem('@user');
            const userJson = user!=null ? JSON.parse(user) : null;

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

    // LOGOUT
    const logout = async () => {
        try {
            await AsyncStorage.removeItem('@user');
            setUser(null);
            navigation.navigate('Main');
        } catch (error) {
            console.log(error);
        }
    }
    // Alertas
    const verAlertas = async () => {
        navigation.navigate('Alertas');
 
    }

    return (
        // Centrar verticalmente la vista
        <View style={ {marginTop: Constants.statusBarHeight,
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
         }  }>
            
            <View style={styles.logo}>
                {/* show welcome and name if*/}
                {user && <Text style={{fontSize: 20, color: '#f5bc0c', fontWeight: 'bold', textAlign: 'center'}}>Bienvenido {user.nombre}</Text>}
                
                {/* Boton redondo rojo de panico con animación */}
                <View style={{alignItems: 'center', justifyContent: 'center', marginTop: '10%', marginBottom: '10%', 
                    height: 200
                }}>

                    <Pressable
                        // style={pressed ? styles.buttonPanicPressed : styles.buttonPanic}
                        // asignar estilo buttonPanic, si esta presionado heredar estilo buttonPanicPressed
                        style={({ pressed }) => [
                            styles.buttonPanic,
                            pressed && styles.buttonPanicPressed
                        ]}

                        // onPress={() => sendAlert()}
                        onPress={() => playAlarm(
                            soundAlarm,
                            setSoundAlarm,
                        )}
                        onPressIn={() => setPressed(true)}
                        onPressOut={() => setPressed(false)}
                    >
                        <Text
                            style={{
                                fontSize: 20,
                                color: '#fff',
                                fontWeight: 'bold',
                                textAlign: 'center'
                            }}
                        >{"ACTIVAR ALERTA!"}</Text>
                    </Pressable>
                    
                </View>
            

                {/* boton logout */}
                <Pressable style={styles.button}>
                    <Button
                        title="Cerrar Sesion"
                        color="#f5bc0c"
                        onPress={logout}
                    />
                </Pressable>
                <Pressable style={styles.button}>
                    <Button
                        title="Alertas"
                        color="#f5bc0c"
                        onPress={verAlertas}
                    />
                </Pressable>

            </View>

        </View>
    )


}

export default Home

const styles = StyleSheet.create({
    button: {
        marginTop: '5%',
        width: '50%',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    logo: {
        marginBottom: '20%',
    },
    buttonPanicPressed : {width: 175, height: 175,backgroundColor: '#ce0a0a'},
    buttonPanic : {alignItems: 'center', justifyContent: 'center', width: 200, height: 200, backgroundColor: '#de0909', borderRadius: 100, shadowColor: 'black', shadowOffset: {
            width: 2,
            height: 5,
        }, shadowOpacity: 1, shadowRadius: 10, elevation: 10,
    }


});
    
