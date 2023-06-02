import React, { useEffect, useState } from 'react';
import { View, Text, Button, TextInput } from 'react-native';
import Peer from 'peerjs';
import { useFocusEffect } from "@react-navigation/native";
import {getUser} from '../services/auth.js';

const Chat = () => {
const [peerId, setPeerId] = useState(null);
const [peer, setPeer] = useState(null);
const [targetId, setTargetId] = useState('');
const [msg, setMsg] = useState('');
const [conectedPeers, setconectedPeers] = useState([]);
const [user, setUser] = useState(null);

    useFocusEffect(
        React.useCallback(() => {
            const getUserFromApi = async () => {
                const user = await getUser();
                setUser(user);
                
                if (!user) {
                    navigation.navigate('Main');
                }else{
                    console.log("Su nombre de usuario es "+ user.nombre);
                }
            }
    
            getUserFromApi();
            
            const initializePeer = async () => {
                const peer = new Peer(undefined, {
                    host: 'localhost',
                    port: 9000,
                    path: '/myapp',
                    key: 'peerjs'
                }); // Crear instancia de Peer
    
                // Esperar a que el Peer se abra y obtener el ID asignado
                peer.on('open', (id) => {
                    setPeerId(id);
                });
    
                // Manejar evento de conexión entrante
                peer.on('connection', (connection) => {
    
                    //agregar par conectado
                    setconectedPeers([...conectedPeers, connection.peer]);
                    
                    // Manejar mensajes entrantes, indicando que usuario envió el mensaje
                    connection.on('data', (data) => {
                        console.log(data);
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

    const connectToPeer = (targetId) => {
        if (!peer) {
            return;
        }

        if(conectedPeers.includes(targetId)){
            console.log("Ya estas conectado a este peer");
            return;
        }

        const connection = peer.connect(targetId); // Conectarse a un Peer

        // Manejar mensajes entrantes
        connection.on('data', (data) => {
            console.log(data);
        });

        //agregar par conectado
        setconectedPeers([...conectedPeers, targetId]);
    };

    const sendMessage = (message) => {
        if (!peer) {
        return;
        }

        // Agregar nombre de usuario antes del mensaje
        message = `${user.nombre}: ${message}`;


        // const connections = peer.connections;

        // // Enviar mensaje a todas las conexiones activas
        // connections.forEach((connection) => {
        // 	connection.send(message);
        // });
        const activeConnections = Object.values(peer.connections).flatMap((connectionList) => connectionList);

        activeConnections.forEach((connection) => {
            connection.send(message);
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

            
                <Button
                    title="Conectar a Peer"
                    onPress={() => connectToPeer(targetId)}
                />
                <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                    onChangeText={(text) => setMsg(text)}
                    value={msg}
                />
                <Button
                    title="Enviar Mensaje"
                    onPress={() => sendMessage(msg)}
                />
                
            </>
            ) : (
            <Text>Cargando...</Text>
        )}
        </View>
    );
};

export default Chat;
