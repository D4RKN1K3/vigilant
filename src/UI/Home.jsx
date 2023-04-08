import React, {useEffect, useState} from 'react'
import { Text, View, Image, Button,Pressable, StyleSheet } from 'react-native'
import Constants from 'expo-constants'
import Botones from '../components/botones'
import Logo from '../components/logo'
import AsyncStorage from '@react-native-async-storage/async-storage';

// Se debe pasar el parametro {navigation} a la vista para poder usar el navigation.navigate() y cambiar de vista
const Home = ( {navigation} ) => {

    // USER
    const [user, setUser] = useState(null);

    // Verificar si hay un usuario logeado
    useEffect(() => {
        
        const checkUser = async () => {
            try {

                const user = await AsyncStorage.getItem('@user');
                const userJson = user!=null ? JSON.parse(user) : null;

                setUser(userJson);

                if (!userJson) {
                    navigation.navigate('Main');
                }

            } catch (error) {
                console.log(error);
            }
        }
        
        checkUser();

    }, []);

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
                
                <Logo/>
                <Text style={{fontSize: 20, color: '#f5bc0c', fontWeight: 'bold', textAlign: 'center'}}>Activar Alerta!</Text>

                {/* boton logout */}
                <Pressable style={styles.button}>
                    <Button
                        title="Cerrar Sesion"
                        color="#f5bc0c"
                        onPress={logout}
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
});
    
