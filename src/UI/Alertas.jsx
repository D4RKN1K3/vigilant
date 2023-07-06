import React, { useEffect, useState } from 'react'
import { ScrollView, SafeAreaView, StyleSheet, TextInput, Button, Text, View, Pressable } from 'react-native';
import { getAlerts } from '../services/alarms/alert.js';
import { getUser, validateUser } from '../services/users/auth.js';
import { useFocusEffect } from "@react-navigation/native";
import Spinner from '../components/spinner';
import { set } from 'react-native-reanimated';
import ListadoAlertas from '../components/listadoAlertas';

// Se debe pasar el parametro {navigation} a la vista para poder usar el navigation.navigate() y cambiar de vista
const Alertas = ({ navigation }) => {
	const [alerts, setAlerts] = useState(null);
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
			setAlerts(alerts);

		}
		getAlertsFromApi();

	}, [user]);

	const styles = StyleSheet.create({
		title: {
			fontSize: 20,
			fontWeight: 'bold',
			textAlign: 'center',
			marginTop: 10
		},
	});

	const listarAlertas = () => {
		// Verificar si hay alertas > 0
		if (alerts.length === 0) {
			return <Text
				style={styles.title}
			>No se encontraron alertas</Text>
		}
		
		return (
			<ListadoAlertas alertas={alerts}/>
		)
	}

	return (
		alerts === null ? <Spinner></Spinner> 
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