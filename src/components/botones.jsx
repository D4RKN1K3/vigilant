import React from 'react'
import {StyleSheet, View,  Pressable, Button, Alert } from 'react-native'
import Constants from 'expo-constants'

const Botones = ( ) => {
    return (
        <View style={ {  }  }>
            <Pressable style={styles.button}> 
                <Button 
                    title="Inicar Sesion"
                    color="#f5bc0c"
                    onPress={() => {
                            Alert.alert('Sesion iniciada')
                    }}
                />

            </Pressable>

            <Pressable style={styles.button}> 
                <Button 
                    title="Registrarse"
                    color="#f5bc0c"
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
