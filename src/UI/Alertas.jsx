import React, {useEffect, useState} from 'react'
import {ScrollView,SafeAreaView, StyleSheet, TextInput,Button, Text, View, Pressable} from 'react-native';
import Alerta from '../components/alerta';
import { getAlerts } from '../services/alert.js';
import { getUser } from '../services/auth.js';

// Se debe pasar el parametro {navigation} a la vista para poder usar el navigation.navigate() y cambiar de vista

const Alertas = ( {navigation} ) => {
  const [alerts,setAlerts] = useState([]);
  const [usuario,setUsuario] = useState({});

  let alertas = [
    {
      id: 1,
      emisor: 'Juan Perez',
      direccion: 'Calle 1 # 2 - 3',
      fecha: '2021-10-10 10:10:10'
    },
    {
      id: 2,
      emisor: 'Maria Lopez',
      direccion: 'Calle 4 # 5 - 6',
      fecha: '2021-10-12 08:10:10'
    },
    {
      id: 3,
      emisor: 'Pedro Gomez',
      direccion: 'Calle 7 # 8 - 9',
      fecha: '2021-10-13 09:10:10'
    },
    {
      id: 4,
      emisor: 'Luisa Rodriguez',
      direccion: 'Calle 10 # 11 - 12',
      fecha: '2021-10-14 10:10:10'
    },
    {
      id: 5,
      emisor: 'Carlos Sanchez',
      direccion: 'Calle 13 # 14 - 15',
      fecha: '2021-10-15 11:10:10'
    },
    {
      id: 1,
      emisor: 'Juan Perez',
      direccion: 'Calle 1 # 2 - 3',
      fecha: '2021-10-10 10:10:10'
    },
    {
      id: 2,
      emisor: 'Maria Lopez',
      direccion: 'Calle 4 # 5 - 6',
      fecha: '2021-10-12 08:10:10'
    },
    {
      id: 3,
      emisor: 'Pedro Gomez',
      direccion: 'Calle 7 # 8 - 9',
      fecha: '2021-10-13 09:10:10'
    },
    {
      id: 4,
      emisor: 'Luisa Rodriguez',
      direccion: 'Calle 10 # 11 - 12',
      fecha: '2021-10-14 10:10:10'
    },
    {
      id: 5,
      emisor: 'Carlos Sanchez',
      direccion: 'Calle 13 # 14 - 15',
      fecha: '2021-10-15 11:10:10'
    },
  ];

  useEffect(()=>{
    const getAlertsFromApi = async () => {
      const user = await getUser();
      setUsuario(user);
      console.log(user);
      const alerts = await getAlerts(user.token);
      setAlerts(alerts);
    }
    getAlertsFromApi();

    console.log('Alertas');
    console.log(alerts);

  },[]);

  const listarAlertas = () => {
    // return <View style={{borderLeftColor: 'orange',borderLeftWidth: 4, marginLeft: 10, marginTop: 10}}>
    //   {alerts.map(alert=>{
    //     let id = alert._id;
    //     let fecha = new Date(alert.date).toLocaleString();
    //     let nombreEmisor = alert.name;
    //     let direccion = alert.address;

    //     return <Alerta key={id} fecha={fecha} emisor={nombreEmisor} direccion={direccion}/>
    //   })}
    // </View>
    // Verificar si hay alertas
    if(alerts.length === 0){
      return <Text>No hay alertas</Text>
    }
    return <View style={{borderLeftColor: 'orange',borderLeftWidth: 4, marginLeft: 10, marginTop: 10}}>
      {alerts.reverse().map(alert=>{
        let id = alert._id;
        let fecha = new Date(alert.date).toLocaleString();
        let nombreEmisor = alert.name;
        let direccion = alert.address;

        return <Alerta key={id} fecha={fecha} emisor={nombreEmisor} direccion={direccion}/>
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
