import React from 'react'
import { StyleSheet ,Text, View, Image } from 'react-native'
import Constants from 'expo-constants'

const Logo = () => {
    return (
        
        <View style={ {marginTop: Constants.statusBarHeight, flexGrow: 1 }  }>
            <Image style={styles.img} source={require('../image/Logovigilant.png')} />
        </View>

    )
}
    
export default Logo

const styles = StyleSheet.create({
    img: {
        height: 200,
        width: 200,
        resizeMode: 'contain',
        alignContent: 'center',
        
    },
  });