import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

/**
 * Crea un separador  ---- o ----
 * @returns Componente Separador
 */
const Separador = () => {

    const styles = StyleSheet.create({
        // Contenedor 
        container: {
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: '5%' ,
            alignItems: 'center',
            marginVertical:'5%',
            marginHorizontal:'5%'
        },
        // Linea
        line: {
            width: '30%',
            height: 1,
            backgroundColor: 'black',
        },
        // Texto
        text: {
            width: '20%',
            textAlign: 'center',
        }
    
    });

    return (
        <View style={styles.container}>
            <View style={styles.line} />
            <Text style={styles.text}>o</Text>
            <View style={styles.line} />
        </View>
    )
}

export default Separador