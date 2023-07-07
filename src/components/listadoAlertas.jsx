import React from 'react'
import Alerta from '../components/alerta';
import { ScrollView, SafeAreaView, StyleSheet, TextInput, Button, Text, View, Pressable } from 'react-native';

/**
 * 
 * @param {*} Alertas
 * @returns Componente ListadoAlertas
 */
const ListadoAlertas = ({ alertas }) => {

	const styles = StyleSheet.create({
		title: {
			fontSize: 20,
			fontWeight: 'bold',
			textAlign: 'center',
			marginTop: 10
		},
		containerAlertas: {
			borderLeftColor: 'orange',
			borderLeftWidth: 4,
			marginLeft: 10,
			marginTop: 10
		}
	});

	if(alertas.length === 0){
		return <Text style={styles.title}>No se encontraron alertas</Text>
	}

    return (
        <View style={styles.containerAlertas}>
			{alertas.map(alert => {
				let id = alert._id;
				let fecha = new Date(alert.date).toLocaleString();
				let emisor = alert.name;
				let direccion = alert.address;

				return <Alerta
					key={id}
					fecha={fecha}
					emisor={emisor}
					direccion={direccion}
				/>
			})}
		</View>
    )
}

export default ListadoAlertas