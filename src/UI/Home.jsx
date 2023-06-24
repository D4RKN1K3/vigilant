import React, {useEffect, useState} from 'react';
import { Text, View, StyleSheet,BackHandler, Alert } from 'react-native';
import Constants from 'expo-constants';
import Boton from '../components/Boton';
import PanicButton from '../components/PanicButton';
import { useFocusEffect } from "@react-navigation/native";
import { getUser, removeUser} from '../services/auth.js';
import 'react-native-get-random-values';
// Se debe pasar el parametro {navigation} a la vista para poder usar el navigation.navigate() y cambiar de vista
const Home = ( {navigation} ) => {

    // USER
    const [user, setUser] = useState(null);

    // boton de panico presionado animacion
    const [pressed, setPressed] = useState(false);

    // sound alarm
    const [soundAlarm, setSoundAlarm] = useState(null);


    // Verificar si hay un usuario logeado
    useFocusEffect(
        React.useCallback(() => {
            const getUserFromApi = async () => {
                const user = await getUser();
                setUser(user);
                if (!user) {
                    navigation.navigate('Main');
                }
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
        }, [])

    );

    // LOGOUT
    const logout = async () => {
        if( removeUser() ){
            setUser(null);
            navigation.navigate('Main');
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
            
            <View>

                {user && <Text style={{fontSize: 20, color: '#f5bc0c', fontWeight: 'bold', textAlign: 'center'}}>Bienvenido(a) {user.nombre}</Text>}

                <PanicButton />

                <Boton title="Cerrar Sesion" onPress={logout} color="#ce0a0a" />

                <Boton title="Ver Alertas" onPress={verAlertas} />

            </View>

        </View>
    )


}

export default Home