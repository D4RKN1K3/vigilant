import React from 'react'
import {  Text, View, Image } from 'react-native'
import Constants from 'expo-constants'

const Main = () => {
    return (
        <View style={ {marginTop: Constants.statusBarHeight }  }>
        <Text>Vigilant</Text>
        <Text>Alarma Vecinal</Text>
        </View>
    )
}
    
export default Main
