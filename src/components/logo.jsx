import React from 'react'
import { StyleSheet ,Text, View, Image } from 'react-native'
import Constants from 'expo-constants'
import Logovigilant from '../image/Logovigilant.png'


/**
 * Crea el logo de la aplicacion Vigilant
 * @returns Componente Logo
 */
const Logo = () => {

    const styles = StyleSheet.create({
        logoContainer: {
            marginTop: Constants.statusBarHeight + 20,
            marginBottom: "20%",
            alignItems: 'center',
            justifyContent: 'center',
        },
        img: {
            height: 200,
            width: 200,
            resizeMode: 'contain',
            alignContent: 'center',
        },
    });    

    return (
        
        <View style={styles.logoContainer}>
            <Image style={styles.img} source={Logovigilant} />
        </View>

    )
    
}
    
export default Logo

