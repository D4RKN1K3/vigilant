import React from 'react'
import {  Text, View, Image, Button,Pressable, StyleSheet } from 'react-native'
import Constants from 'expo-constants'
import Botones from '../components/botones'
import Logo from '../components/logo'

// Se debe pasar el parametro {navigation} a la vista para poder usar el navigation.navigate() y cambiar de vista
const Main = ( {navigation} ) => {
    return (
        <View style={ {marginTop: Constants.statusBarHeight }  }>
            <Logo />
            
            <Pressable style={styles.button}> 
                <Button 
                    title="Inicar Sesion"
                    color="#f5bc0c"
                    onPress={() => navigation.navigate('Autenticacion')}
                    //onPress={() => {
                        //let response = login('olverarce01@gmail.com', '12345')
                        //console.log(response)
                        //if (response) {
                          //  Alert.alert('Sesion iniciada')
                          //  console.log(response)
                        //} else {
                        //    Alert.alert('No se pudo iniciar sesion')
                      //  }

                    //}}
                />

            </Pressable>

            <Pressable style={styles.button}> 
                <Button 
                    title="Registrarse"
                    color="#f5bc0c"
                    onPress={() => navigation.navigate('Registro')}
                    //onPress={() => navigation.navigate('Registro') // {
                        
                        //    let response = register('test', 'test')
                        //  console.log(response)
                        //  if (response) {
                        //      Alert.alert('Registrado')
                        //      console.log(response)
                        //  } else {
                        //      Alert.alert('No se pudo registrar')
                        //  }
                        //}
                   // }
                />
            </Pressable>

            <Button
                title="Cambiar de vista"
                onPress={() => navigation.navigate('Ejemplo')}
            />
        </View>
    )
}

export default Main

const styles = StyleSheet.create({
    button: {
        marginTop: '5%',
        marginLeft: '25%',
        alignItems: 'center',
        borderRadius: 10,
        width: '50%',
        height: '20%',
    },
});
    
