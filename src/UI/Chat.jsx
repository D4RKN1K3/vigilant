import React, { useEffect, useState } from 'react';
import { View, Text, Button, TextInput } from 'react-native';
import {Peer} from 'peerjs';
import { useFocusEffect } from '@react-navigation/native';
import { getUser } from '../services/auth.js';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

const Chat = () => {
    const [peerId, setPeerId] = useState(null);
    const [peer, setPeer] = useState(null);
    const [targetId, setTargetId] = useState('');
    const [msg, setMsg] = useState('');
    const [user, setUser] = useState(null);
    const [messages, setMessages] = useState([]); // Estado para almacenar los mensajes
    const [availablePeers, setAvailablePeers] = useState([]); // Estado para almacenar los peers disponibles, formato {id: peerId, username: nombreUsuario}
    const [activeConnections, setActiveConnections] = useState([]); // Estado para almacenar las conexiones activas
    const [connectedPeers, setConnectedPeers] = useState([]); // Estado para almacenar los peers conectados, formato {id: peerId, username: nombreUsuario}
    const [allPeers, setAllPeers] = useState([]); // Estado para almacenar todos los peers, ids

    const [incommingConnections, setIncommingConnections] = useState([]); // Estado para almacenar las conexiones entrantes

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

            // Cleanup
            return () => {
                if (peer) {
                    peer.destroy();
                }
            };
        }, [])
    );

    useEffect(() => {
        // Comprobar si el usuario está autenticado
        if (!user) {
            return;
        }

        // Crear instancia de Peer
        const initializePeer = async () => {
            const peer = new Peer(undefined, {
                host: '190.92.148.107',
                port: 5051,
                path: '/peerjs/myapp'
            }); // Crear instancia de Peer

            // Esperar a que el Peer se abra
            peer.on('open', (id) => {
                setPeerId(id);
                console.log('Mi ID de Peer es: ' + id);
            });

            // Manejar evento de conexión entrante
            peer.on('connection', (connection) => {

                connection.on('open', () => {
                    connection.send(user.nombre+':'); // Enviar mensaje al Peer conectado
                    //log
                    console.log('se envio el mensaje');
                    setConnectedPeers((connectedPeers)=>[...connectedPeers, connection]); // Agregar conexion al estado de conexiones activas
                    // agregar id de conexion a availablePeers, con nombre de usuario igual al id
                    setAvailablePeers((disponibles)=>[...disponibles, { id: connection.peer, username: connection.peer }]);
                });

                 // Manejar mensajes entrantes, agregarlos al estado de mensajes
                connection.on('data', (data) => {
                    // Obtener nombre de usuario del mensaje
                    const nombreUsuario = data.split(':')[0];
                    const mensaje = data.split(':')[1];
                    console.log('Mensaje de ' + nombreUsuario + ': ' + data);
                    console.log(data);
                    setConnectedPeers((connectedPeers)=>[...connectedPeers, connection]);
                    console.log(connection);
                    console.log(connectedPeers.length);

                    console.log('Agregando ' + nombreUsuario + ' a la lista de peers disponibles');
                    // Cambiar nombre de usuario de los availablePeers con el mismo id que la conexion, por nombreUsuario
                    setAvailablePeers((disponibles)=>disponibles.map((peerDisp) => {
                        if (peerDisp.id === connection.peer) {
                            return { id: peerDisp.id, username: nombreUsuario };
                        }
                        return peerDisp;
                    }));

                    // Si el mensaje es mas largo que 1, agregarlo al estado de mensajes
                    if (mensaje.length > 1) {
                        // Agregar mensaje al estado de mensajes
                        setMessages((prevMessages) => [...prevMessages, data]);
                        // Si la conexion ya está en activeConnections, retornar
                        // if (activeConnections.includes(connection) === false) {
                        //     setActiveConnections((prevConnections) => [...prevConnections, connection]);
                        // }

                        // add incoming connection
                        setIncommingConnections((incommingConnections)=> [...incommingConnections, connection]);

                        
                    }
                });

            });

            setPeer(peer);
        };

        initializePeer();
    }, [user]);

    useEffect(() => {
        // Comprobar si el usuario está autenticado y si el peer está inicializado
        if (!user || !peer) {
            return;
        }

        const getAllPeers = () => {
            peer.listAllPeers((peers) => {
                // Filtrar peers disponibles
                let listaPeers = peers.filter((idPeer) => idPeer != peer.id);
                
                // Actualizar el estado de
                setAllPeers(listaPeers);
            });
        };

        // Ejecutar cada 3 segundos
        const interval = setInterval(() => {
            getAllPeers();
        } , 3000);        

    } , [peer]);

    useEffect(() => {
        // Comprobar si el usuario está autenticado y si el peer está inicializado
        if (!user || !peer || !connectedPeers) {
            return;
        }

        // Si la lista de peers disponibles es diferente a la anterior, actualizar el estado
        if (allPeers.length >0) {

            console.log(connectedPeers);

            // Obtener ids de peers conectados
            let peersConectados = Object.values(peer.connections).flatMap((connectionList) => connectionList).map((connection) => connection.peer);
            
            // Desconectar peers que ya no están disponibles
            peersConectados.forEach((connection) => {
                console.log(allPeers.includes(connection));
                // Si el peer no está disponible, desconectar
                if (!allPeers.includes(connection)) {
                    setConnectedPeers((peersCon)=> peersCon.filter((connectedPeer) => connectedPeer.peer != connection));
                    // quitar de availablePeers
                    setAvailablePeers((disponibles)=> disponibles.filter((peerDisp) => peerDisp.id != connection));
                    connection.close();
                    console.log('Desconectado de ' + connection);
                }
            });
            // Actualizar el estado de peers disponibles
            allPeers.forEach((idPeer) => {
                // Si el peer no está conectado, agregarlo
                if (!peersConectados.includes(idPeer)) {
                    connectToPeer(idPeer);
                }
            });
        } 


    }, [allPeers]);

    const connectToPeer = (idTarget) => {
        //log 
        console.log('Iniciando conexion a ' + idTarget);
        if (!peer) {
            //log
            console.log('Peer no inicializado');
            return;
        }

        let conexion = peer.connect(idTarget); // Conectarse a un Peer

        conexion.on('open', () => {
            conexion.send(user.nombre+':'); // Enviar mensaje al Peer conectado
            //log
            console.log('se envio el mensaje');
            setConnectedPeers((connectedPeers)=>[...connectedPeers, conexion]); // Agregar conexion al estado de conexiones activas
            // agregar id de conexion a availablePeers, con nombre de usuario igual al id
            setAvailablePeers((disponibles)=>[...disponibles, { id: conexion.peer, username: conexion.peer }]);
        });

        // Manejar mensajes entrantes, agregarlos al estado de mensajes
        conexion.on('data', (data) => {
            // Obtener nombre de usuario del mensaje
            const nombreUsuario = data.split(':')[0];
            const mensaje = data.split(':')[1];
            console.log('Mensaje de ' + nombreUsuario + ': ' + data);
            console.log(data);
            setConnectedPeers((connectedPeers)=>[...connectedPeers, conexion]);
            console.log(conexion);
            console.log(connectedPeers.length);

           // Cambiar nombre de usuario de los availablePeers con el mismo id que la conexion, por nombreUsuario
            setAvailablePeers((disponibles)=>disponibles.map((peerDisp) => {
                if (peerDisp.id === conexion.peer) {
                    return { id: peerDisp.id, username: nombreUsuario };
                }
                return peerDisp;
            }));

            // Si el mensaje es mas largo que 1, agregarlo al estado de mensajes
            if (mensaje.length > 1) {
                // Agregar mensaje al estado de mensajes
                setMessages((prevMessages) => [...prevMessages, data]);
                // Si la conexion ya está en activeConnections, retornar
                // if (activeConnections.includes(conexion) === false) {
                //     setActiveConnections((activeConnections)=> [...activeConnections, conexion]);
                // }
                // add incoming connection
                setIncommingConnections((incommingConnections)=> [...incommingConnections, conexion]);
            }
        });

    };

    useEffect(() => {

        // Comprobar si el usuario está autenticado y si el peer está inicializado
        if (!user || !peer || !incommingConnections || incommingConnections.length === 0) {
            return;
        }

        // Agregar conexiones entrantes a activeConnections
        incommingConnections.forEach((connection) => {
            // Si la conexion ya está en activeConnections, retornar
            if (activeConnections.includes(connection) === false) {
                setActiveConnections((activeConnections)=> [...activeConnections, connection]);
            }
        });

        // Limpiar incommingConnections
        setIncommingConnections([]);

    }, [incommingConnections]);

    const addActiveConnection = (id) => {
        // Buscar conexion por id
        let conexion = connectedPeers.find((connection) => (connection.peer === id));

        // Agregar conexion al estado de conexiones incoming
        setIncommingConnections((incommingConnections)=> [...incommingConnections, conexion]);
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
            {peer ? (
                <>
                    <Text style={{ marginBottom: 10 }}>Peers disponibles:</Text>
                    <View style={{ height: 200, width: 300, borderColor: 'gray', borderWidth: 1 }}>
                        <ScrollView>
                            {availablePeers.map((disponible) => (
                                // nice red : #A52A2A
                                // nice green : #228B22
                                <TouchableOpacity key={disponible.id} onPress={() => addActiveConnection(disponible.id)}>
                                    <Text style={{ margin: 5, backgroundColor: activeConnections.some((connection) => connection.peer === disponible.id) ? '#228B22': 'trasparent',
                                    color: activeConnections.some((connection) => connection.peer === disponible.id) ? '#FFFFFF': '#000000'}}>{disponible.username}</Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>
                    
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
                    
                    <Text style={{ marginBottom: 10 }}>ID de Peer: {peerId}</Text>
                </>
            ) : (
                <Text>Cargando...</Text>
            )}
        </View>
    );
};

export default Chat;
