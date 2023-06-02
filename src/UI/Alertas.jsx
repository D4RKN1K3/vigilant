import React, { useEffect, useState } from 'react'
import { ScrollView, SafeAreaView, StyleSheet, TextInput, Button, Text, View, Pressable } from 'react-native';
import Alerta from '../components/alerta';
import { getAlerts } from '../services/alert.js';
import { getUser } from '../services/auth.js';
import { useFocusEffect } from "@react-navigation/native";

// Se debe pasar el parametro {navigation} a la vista para poder usar el navigation.navigate() y cambiar de vista

const Alertas = ({ navigation }) => {
	const [alerts, setAlerts] = useState([]);
	const [user, setUser] = useState({});

	useFocusEffect(

		React.useCallback(() => {
			const getAlertsFromApi = async () => {
				const user = await getUser();
				setUser(user);
				console.log(user);
				const alerts = await getAlerts(user.token);
				if (alerts){
					setAlerts(alerts);
				}else{
					// No se encontraron alertas
					setAlerts([null]);
				}
				
				if (!user) {
					navigation.navigate('Main');
				}
			}
			getAlertsFromApi();

			console.log('Alertas');
			console.log(alerts);
		}, [])

	);

	const listarAlertas = () => {
		// Verificar si hay alertas
		if (alerts.length === 0) {
			return <Text>Cargando alertas...</Text>
		}else if (alerts[0] === null){
			return <Text>No se encontraron alertas</Text>
		}
		return <View style={{ borderLeftColor: 'orange', borderLeftWidth: 4, marginLeft: 10, marginTop: 10 }}>
			{alerts.map(alert => {
				let id = alert._id;
				let fecha = new Date(alert.date).toLocaleString();
				let nombreEmisor = alert.name;
				let direccion = alert.address;

				return <Alerta key={id} fecha={fecha} emisor={nombreEmisor} direccion={direccion} />
			}
			)}
		</View>

	}

	return (
		<SafeAreaView>
			<ScrollView>
				{listarAlertas()}

			</ScrollView>
		</SafeAreaView>
	);
	// <View>
	// alerts.map(alert=>{
	// const date =new Date(alert.createdAt);
	// const user = alert.alertAndSender.name;
	// const address = alert.alertAndSender.address;

	// const dateString = date.toLocaleString(); 
	// return <View key={alert._id}><Text >Emisor: {user} Direccion: {address} Fecha: {dateString}</Text></View>;
	// })}

	// </View>
}

export default Alertas