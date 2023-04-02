import React from 'react'
import {  Text, View, Image } from 'react-native'
import Constants from 'expo-constants'

const Main = () => {
    return (
        <View style={ {marginTop: Constants.statusBarHeight, flexGrow: 1 }  }>
        <Text>Vigilant</Text>
        <Text>Alarma Vecinal</Text>
        </View>
    )
}
    
export default Main
