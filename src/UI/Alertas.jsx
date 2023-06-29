import React, { useEffect, useState } from 'react'
import { ScrollView, SafeAreaView, StyleSheet, TextInput, Button, Text, View, Pressable } from 'react-native';
import Alerta from '../components/alerta';
import { getAlerts } from '../services/alarms/alert.js';
import { getUser, validateUser } from '../services/users/auth.js';
import { useFocusEffect } from "@react-navigation/native";
import Spinner from '../components/spinner';
import { set } from 'react-native-reanimated';

// Se debe pasar el parametro {navigation} a la vista para poder usar el navigation.navigate() y cambiar de vista

const Alertas = ({ navigation }) => {
	const [alerts, setAlerts] = useState([]);
	const [user, setUser] = useState(null);

	useFocusEffect(

		React.useCallback(() => {
			const getUserFromApi = async () => {
				setUser(await validateUser(navigation));
			}
			getUserFromApi();

		}, [])

	);

	useEffect(() => {
		if(!user){
			return;
		}

		const getAlertsFromApi = async () => {
			const alerts = await getAlerts(user.token);
			if (alerts){
				setAlerts(alerts);
			}else{
				// No se encontraron alertas
				setAlerts([null]);
			}
		}
		getAlertsFromApi();

	}, [user]);

	const listarAlertas = () => {
		// Verificar si hay alertas
		if (alerts[0] === null){
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
		alerts.length === 0 ? <Spinner></Spinner> 
		:(
		<SafeAreaView>
			<ScrollView>
				{listarAlertas()}
			</ScrollView>
		</SafeAreaView>
		)
	);
}

export default Alertas