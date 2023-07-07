import React from 'react';
import {StyleSheet, Pressable, Button} from 'react-native';

/**
 * 
 * @param {*} props Datos del boton: titulo, color, onPress
 * @returns Componente Boton
 */
const Boton = ({title, onPress, color = "#f5bc0c"}) => {
    return (
        <Pressable style={styles.pressableButton}>
            <Button
                title={title}
                color={color}
                onPress={onPress}
            />
        </Pressable>
    )
}


const styles = StyleSheet.create({
    pressableButton: {
        marginTop: '5%',
        width: '50%',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
});
    
// export {Boton, BotonAlerta}
export default Boton