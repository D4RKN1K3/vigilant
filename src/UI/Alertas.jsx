import React, {useEffect, useState} from 'react'
import {SafeAreaView, StyleSheet, TextInput,Button, Text, View, Pressable} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Alerta from '../components/alerta';

// Se debe pasar el parametro {navigation} a la vista para poder usar el navigation.navigate() y cambiar de vista

const Alertas = ( {navigation} ) => {
  const [alerts,setAlerts] = useState([]);

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
    //getAlerts();
  },[])

  const getAlerts = () =>{
    AsyncStorage.getItem('@user')
    .then(response=>{
      const token = JSON.parse(response).token;
      if(token){
        axios({
          method: 'get',
          url: 'https://backend-sistemaalertas-production.up.railway.app/alerts',
          headers: {
            'Authorization': 'Bearer '+token
          }
        })
        .then((response)=>{
          const data = response.data;
          setAlerts(data);
        });
      }  
    })
  }

  const listarAlertas = () => {
    return <View style={{borderLeftColor: 'orange',borderLeftWidth: 4, marginLeft: 10, marginTop: 10}}>
      {alertas.map(alerta=>{
        return <Alerta key={alerta.id} fecha={alerta.fecha} emisor={alerta.emisor} direccion={alerta.direccion}/>
      })}
    </View>
  }

return (
    <SafeAreaView>
      {listarAlertas()}
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
