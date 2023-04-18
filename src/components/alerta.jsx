import React from 'react'
import { Text, View, Image, Button,Pressable, StyleSheet, BackHandler, Alert } from 'react-native'
import Constants from 'expo-constants'
import Botones from '../components/botones'
import Logo from '../components/logo'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';


const Alerta = (props) => {
    return (
      <View style={styles.container}>
        <View style={styles.dateContainer}>
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
        flex: 1,
        display: 'grid',
        gridTemplateColumns: '1fr 2fr',
        justifyContent: 'center',
        paddingTop: Constants.statusBarHeight,
        backgroundColor: '#fff',
        paddingTop: 20,
        paddingBottom: 20,
        marginBottom: 10,
        marginRight: 20,
    },
    dateContainer: {
        textAlign: 'center',
        // borde derecha gris
        borderRightColor: '#666',
        borderRightWidth: 1,
        paddingLeft: 10,
        paddingRight: 10,
    },
    emisorContainer: {
        paddingLeft: 10,
    },
    emisorText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    direccionText: {
        fontSize: 16,
        // color de texto gris oscuro
        color: '#666',
    },
});


export default Alerta