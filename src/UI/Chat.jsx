import React, { useEffect, useState } from 'react';
import { View, Text, Button, TextInput } from 'react-native';
import Peer from 'peerjs';
import { useFocusEffect } from '@react-navigation/native';
import { getUser } from '../services/auth.js';

const Chat = () => {
    const [peerId, setPeerId] = useState(null);
    const [peer, setPeer] = useState(null);
    const [targetId, setTargetId] = useState('');
    const [msg, setMsg] = useState('');
    const [conectedPeers, setconectedPeers] = useState([]);
    const [user, setUser] = useState(null);
    const [messages, setMessages] = useState([]); // Estado para almacenar los mensajes

    useFocusEffect(
        React.useCallback(() => {
            const getUserFromApi = async () => {
                const user = await getUser();
                setUser(user);

                if (!user) {
                    navigation.navigate('Main');
                } else {
                    console.log('Su nombre de usuario es ' + user.nombre);
                }
            };

            getUserFromApi();

            const initializePeer = async () => {
                const peer = new Peer(undefined, {
                    host: '190.92.148.107',
                    port: 3000,
                    path: '/peerjs/myapp'
                }); // Crear instancia de Peer

                // Esperar a que el Peer se abra y obtener el ID asignado
                peer.on('open', (id) => {
                    setPeerId(id);
                });                               

                // Manejar evento de conexión entrante
                peer.on('connection', (connection) => {
                    // Agregar par conectado
                    setconectedPeers([...conectedPeers, connection.peer]);

                    // Manejar mensajes entrantes, agregarlos al estado de mensajes
                    connection.on('data', (data) => {
                        console.log(data);
                        setMessages((prevMessages) => [...prevMessages, data]); // Actualizar el estado de mensajes
                    });
                });

                setPeer(peer);                
            };
                    

            initializePeer();           

            // Cleanup
            return () => {
                if (peer) {
                    peer.destroy();
                }
            };
        }, [])
    );

    //async conect to peers
    const connectToPeers =  () => {

        peer.listAllPeers((peers) => {
            //por cada peer encontrado, distinto de peerId, conectarse
            peers.forEach((peerId) => {
                if (peerId !== peer.id) {
                    connectToPeer(peerId);
                }
            });
        });
    };  

    const connectToPeer = (targetId) => {
        //log 
        console.log('Conectando a ' + targetId);
        if (!peer) {
            //log
            console.log('Peer no inicializado');
            return;
        }

        if (conectedPeers.includes(targetId)) {
            console.log('Ya estás conectado a este peer');
            return;
        }

        const connection = peer.connect(targetId); // Conectarse a un Peer

        // Manejar mensajes entrantes, agregarlos al estado de mensajes
        connection.on('data', (data) => {
            console.log(data);
            setMessages((prevMessages) => [...prevMessages, data]); // Actualizar el estado de mensajes
        });

        // Agregar par conectado
        setconectedPeers([...conectedPeers, targetId]);
    };

    const sendMessage = (message) => {
        if (!peer) {
            return;
        }

        // comprobar si el mensaje es vacío
        if (!message) {
            return;
        }

        // Agregar nombre de usuario antes del mensaje
        message = `${user.nombre}: ${message}`;

        const activeConnections = Object.values(peer.connections).flatMap((connectionList) => connectionList);

        activeConnections.forEach((connection) => {
            connection.send(message);

            // Agregar mensaje al estado de mensajes
            setMessages((prevMessages) => [...prevMessages, message]);

            // Limpiar input
            setMsg('');
        });
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            {peerId ? (                
                <>
                    
                    <Text style={{ marginBottom: 10 }}>ID de Peer: {peerId}</Text>
                    {/* input ingresar target-peer-id */}
                    <Text style={{ marginBottom: 10 }}>ID de Peer a conectar:</Text>
                    <TextInput
                        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                        onChangeText={(text) => setTargetId(text)}
                        value={targetId}
                    />

                    <Button title="Conectar" onPress={() => connectToPeers()} />
                    <TextInput
                        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                        onChangeText={(text) => setMsg(text)}
                        value={msg}
                    />
                    <Button title="Enviar Mensaje" onPress={() => sendMessage(msg)} />

                    {/* mostrar cada vez que se recibe un mensaje, scrolleable */}
                    <Text style={{ marginTop: 10 }}>Mensajes:</Text>
                    <View style={{ height: 200, width: 300, borderColor: 'gray', borderWidth: 1, marginTop: 10 }}>
                        {messages.map((message, index) => (
                            <Text key={index}>{message}</Text>
                        ))}
                    </View>
                </>
            ) : (
                <Text>Cargando...</Text>
            )}
        </View>
    );
};

export default Chat;
