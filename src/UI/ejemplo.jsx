import React from 'react'
import {  Text, View, Image, Button } from 'react-native'
import Constants from 'expo-constants'

// Se debe pasar el parametro {navigation} a la vista para poder usar el navigation.navigate() y cambiar de vista
const Ejemplo = ( {navigation} ) => {
    return (
        <View style={ {marginTop: Constants.statusBarHeight }  }>
            <Text>
                Hola desde ejemplo
            </Text>

            <Button
                title="Cambiar de vista"
                onPress={() => navigation.navigate('Registro')}
            />
        </View>
    )
}

export default Ejemplo
