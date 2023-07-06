import React from 'react'
import Alerta from '../components/alerta';
import { View } from 'react-native'

const ListadoAlertas = ({ alertas }) => {
    return (
        <View style={{ borderLeftColor: 'orange', borderLeftWidth: 4, marginLeft: 10, marginTop: 10 }}>
			{alertas.map(alert => {
				let id = alert._id;
				let fecha = new Date(alert.date).toLocaleString();
				let nombreEmisor = alert.name;
				let direccion = alert.address;

				return <Alerta key={id} fecha={fecha} emisor={nombreEmisor} direccion={direccion} />
			}
			)}
		</View>
    )
}

export default ListadoAlertas