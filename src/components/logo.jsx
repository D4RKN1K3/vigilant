import React from 'react'
import { StyleSheet ,Text, View, Image } from 'react-native'
import Constants from 'expo-constants'
import Logovigilant from '../image/Logovigilant.png'

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

const Logo = () => {

    return (
        
        <View style={styles.logoContainer}>
            <Image style={styles.img} source={Logovigilant} />
        </View>

    )
    
}
    
export default Logo

