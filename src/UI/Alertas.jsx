import React, {useEffect, useState} from 'react'
import {SafeAreaView, StyleSheet, TextInput,Button, Text, View, Pressable} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Se debe pasar el parametro {navigation} a la vista para poder usar el navigation.navigate() y cambiar de vista

const Alertas = ( {navigation} ) => {
  const [alerts,setAlerts] = useState([]);
  useEffect(()=>{
    getAlerts();
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

return <View>
    {alerts.map(alert=>{
      const date =new Date(alert.createdAt);
      const user = alert.alertAndSender.name;
      const address = alert.alertAndSender.address;

      const dateString = date.toLocaleString(); 
      return <View key={alert._id}><Text >Emisor: {user} Direccion: {address} Fecha: {dateString}</Text></View>;
    })}
</View>;
}

export default Alertas
