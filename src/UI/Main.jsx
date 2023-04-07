import React from 'react'
import {  Text, View, Image, Button } from 'react-native'
import Constants from 'expo-constants'
import Botones from '../components/botones'
import Logo from '../components/logo'

// Se debe pasar el parametro {navigation} a la vista para poder usar el navigation.navigate() y cambiar de vista
const Main = ( {navigation} ) => {
    return (
        <View style={ {marginTop: Constants.statusBarHeight }  }>
            <Logo />
            <Botones />

            <Button
                title="Cambiar de vista"
                onPress={() => navigation.navigate('Ejemplo')}
            />
        </View>
    )
}

export default Main
