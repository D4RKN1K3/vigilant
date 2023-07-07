import React from 'react'
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native'

/**
 * Crea un Spinner de carga
 * @returns Componente Spinner
 */
const Spinner = () => {

    const styles = StyleSheet.create({
        spinnerContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
    });

    return (
        <View style={styles.spinnerContainer}>
            {/* antes: f5bc0c */}
            <ActivityIndicator size="large" color="#0000ff" />
            <Text>Cargando...</Text>
        </View>
    )
}

export default Spinner