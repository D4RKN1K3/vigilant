import React from 'react'
import { StyleSheet, Text } from 'react-native'

/**
 * Crea un titulo
 * @param {*} props hijos del componente
 * @returns Componente Titulo
 */
const Titulo = ({children}) => {

    // Titulo component styles
    const styles = StyleSheet.create({
        title: {
            fontSize: 40,
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: '10%',
        }
    });
    
    return (
        <Text style={styles.title}>{children}</Text>    
    )
}




export default Titulo