import React from 'react'
import { StyleSheet, Text, View,
    ActivityIndicator, } from 'react-native'

const Spinner = () => {

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
    });

    return (
        <View style={styles.container}>
            {/* antes: f5bc0c */}
            <ActivityIndicator size="large" color="#0000ff" />
            <Text>Cargando...</Text>
        </View>
    )
}

export default Spinner