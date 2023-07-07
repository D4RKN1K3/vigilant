import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import Constants from 'expo-constants'

/**
 * 
 * @param {*} props Datos de la alerta a mostrar: fecha, emisor, direccion
 * @returns Componente Alerta
 */
const Alerta = ({fecha,emisor,direccion}) => {

    // stylesheet
    const styles = StyleSheet.create({
        container: {
            // gridTemplateColumns: '1fr 3fr',
            flexDirection: 'row',
            // justifyContent: 'center',
            paddingTop: Constants.statusBarHeight + 20,
            backgroundColor: '#fff',
            paddingBottom: 20,
            marginBottom: 10,
            marginRight: 20,
        },
        dateContainer: {
            textAlign: 'center',
            borderRightColor: '#666',
            borderRightWidth: 1,
            paddingLeft: 30,
            paddingRight: 10,
            position: 'relative',
            width: 130,
        },
        emisorContainer: {
            paddingLeft: 10,
        },
        alertDot: {
            width: 20, 
            height: 20, 
            borderRadius: 10, 
            backgroundColor: 'orange', 
            marginBottom: 10,
            position: 'absolute',
            left: -10,
        },
        emisorText: {
            fontSize: 18,
            fontWeight: 'bold',
        },
        direccionText: {
            fontSize: 16,
            color: '#333',
        },
    });

    return (
        <View style={styles.container}>
            <View style={styles.dateContainer}>
            {/* circle */}
            <View style={styles.alertDot}></View>
            <Text>{fecha}</Text>
            </View>
            <View style={styles.emisorContainer}>
            <Text style={styles.emisorText}>{emisor}</Text>
            <Text style={styles.direccionText}>{direccion}</Text>
            </View>
        </View>
    )
}


export default Alerta