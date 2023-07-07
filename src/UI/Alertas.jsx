import React, { useEffect, useState } from 'react'
import { ScrollView, SafeAreaView, StyleSheet, TextInput, Button, Text, View, Pressable } from 'react-native';
import { getAlerts } from '../services/alarms/alert.js';
import { getUser, validateUser } from '../services/users/auth.js';
import { useFocusEffect } from "@react-navigation/native";
import Spinner from '../components/Spinner';
import { set } from 'react-native-reanimated';
import ListadoAlertas from '../components/listadoAlertas';

/**
 * Crea la vista de Alertas
 * @param {*} props Parametros: navigation
 * @returns Componente Alertas
 */
const Alertas = ({ navigation }) => {
	const [alerts, setAlerts] = useState(null);
	const [user, setUser] = useState(null);
	const [spinner, setSpinner] = useState(true);

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
			setSpinner(false);
		}
		getAlertsFromApi();

	}, [user]);

	if(spinner){
		return <Spinner/>
	}

	return (
		<SafeAreaView>
			<ScrollView>
				<ListadoAlertas alertas={alerts}/>
			</ScrollView>
		</SafeAreaView>
	);
}

export default Alertas