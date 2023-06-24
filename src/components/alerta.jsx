import React from 'react'
import { Text, View, Image, Button,Pressable, StyleSheet, BackHandler, Alert } from 'react-native'
import Constants from 'expo-constants'

const Alerta = (props) => {
    return (
      <View style={styles.container}>
        <View style={styles.dateContainer}>
          {/* circle */}
          <View style={styles.alertDot}></View>
          <Text>{props.fecha}</Text>
        </View>
        <View style={styles.emisorContainer}>
          <Text style={styles.emisorText}>{props.emisor}</Text>
          <Text style={styles.direccionText}>{props.direccion}</Text>
        </View>
      </View>
    )
  }
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


export default Alerta