import React from 'react'
import {StyleSheet, View,  Pressable, Button, Alert } from 'react-native'
import Constants from 'expo-constants'
import {login, register} from '../data/Autentication'


const Botones = () => {
    return (
        <View style={ {  }  }>
            <Pressable style={styles.button}> 
                <Button 
                    title="Inicar Sesion"
                    color="#f5bc0c"
                    onPress={() => {
                        let response = login('olverarce01@gmail.com', '12345')
                        console.log(response)
                        if (response) {
                            Alert.alert('Sesion iniciada')
                            console.log(response)
                        } else {
                            Alert.alert('No se pudo iniciar sesion')
                        }

                    }}
                />

            </Pressable>

            <Pressable style={styles.button}> 
                <Button 
                    title="Registrarse"
                    color="#f5bc0c"
                    onPress={() => {
                        let response = register('test', 'test')
                        console.log(response)
                        if (response) {
                            Alert.alert('Registrado')
                            console.log(response)
                        } else {
                            Alert.alert('No se pudo registrar')
                        }
                    }}
                />
            </Pressable>

        </View>
    )
}

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
    
export default Botones
