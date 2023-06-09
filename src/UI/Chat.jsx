import React, { useEffect, useState } from 'react';
import { View, Text, Button, TextInput } from 'react-native';
import Peer from 'peerjs';
import { useFocusEffect } from '@react-navigation/native';
import { getUser } from '../services/auth.js';
import { set } from 'react-native-reanimated';


const Chat = () => {
    const [peerId, setPeerId] = useState(null);
    const [peer, setPeer] = useState(null);
    const [targetId, setTargetId] = useState('');
    const [msg, setMsg] = useState(''); // Estado para almacenar el mensaje a enviar
    const [user, setUser] = useState(null); // Estado para almacenar el usuario

    const [connections, setConnections] = useState([]); // Estado para almacenar las conexiones {id, usuario, connection, estado, mensajes}
    const [chatSelected, setChatSelected] = useState(null); // Estado para almacenar el chat seleccionado (id de usuario)

    useFocusEffect(
        React.useCallback(() => {

            const getUserFromApi = async () => {
                const userGetted = await getUser();
                setUser(userGetted);

                if (!userGetted) {
                    navigation.navigate('Main');
                }

                return userGetted;
            };
            // Obtener usuario
            getUserFromApi();

            // Cleanup
            return () => {
                if (peer) {
                    peer.destroy();
                }
            };
        }, [])
    );

    // Cuando cargue el usuario, inicializar Peer
    useEffect(() => {

        // Verificar si ya se obtuvo el usuario
        if (!user) {
            return;
        }

        console.log('Inicializando Peer');
        // Crear instancia de Peer
        const peer = new Peer(undefined, {
            host: '127.0.0.1',
            port: 9000,
            path: '/myapp',
            key: 'peerjs',
        }); 

        // Agregar instancia de Peer al estado de Peer
        setPeer(peer);

        // Verificar si está listo el peer y si ya se obtuvo el usuario
        peer.on('open', (id) => {
            // Agregar ID a estado de ID
            setPeerId(id);
        });

    }, [user]);

    // Cuando se inicialice el Peer y se obtenga el ID, obtener lista de pares conectados
    useEffect(() => {
        console.log('Verificando estado de Peer');
        // Verificar si está listo el peer
        if (!peer || !peerId) {
            return;
        }

        console.log('Peer inicializado!');

        // Configurar conexiones entrante y agregarla al estado de conexiones 
        peer.on('connection', (connection) => {
            
            // Agregar conexión al estado de conexiones
            const conexion = { id: connection.peer, usuario: connection.peer, connection: connection, estado: 'conectado', mensajes: [] };
            setConnections((prevConnections) => [...prevConnections, conexion]);

            // Mensajes recibidos
            connection.on('data', (data) => {
                console.log(data);
                receiveMessage(connection, data);
            } );

        });

        // Verificar estado de conexiones en 5 segundos
        updateConnections();

    }, [peer, peerId]);

    // Cuando se actualice el estado de conexiones, verificar estado de cada conexión
    const updateConnections = () => {
        
        // Obtener lista de pares conectados
        peer.listAllPeers((peers) => {
            console.log('Verificando estado de conexiones');
            var prevconnections = [...connections];    
            
            // Verificar estado de cada conexión
            prevconnections.forEach((conexion) => {
                if (peers.includes(conexion.id)) {
                    // Conexión activa
                    conexion.estado = 'conectado';
                } else {
                    // Conexión inactiva
                    conexion.estado = 'desconectado';
                }
            }

            );

            // Crear nuevas conexiones
            peers.forEach((peerToken) => {

                console.log(prevconnections)
                // Verificar que no sea el mismo peer
                if (peerToken === peerId) {
                    return;
                }

                // Verificar si ya existe la conexión
                if (!prevconnections.find((conexion) => conexion.id === peerToken)) {
                    // Conexión nueva
                    console.log('Nueva conexión');

                    startConn = async () => {
                        // Iniciar conexión
                        const conn = peer.connect(peerToken);

                        // Definir mensajes recibidos
                        conn.on('data', (data) => {
                            console.log(data);
                            receiveMessage(conn, data);
                        });

                        // Definir conexión abierta
                        conn.on('open', () => {
                            console.log('Conexión abierta');
                            // Enviar su nombre de usuario
                            console.log('Enviando nombre de usuario');
                            conn.send(`?${user.nombre}`);
                        });
                    };

                    startConn();

                    // Agregar conexión al estado de conexiones
                    const conexion = { id: peerToken, usuario: peerToken, connection: conn, estado: 'conectado', mensajes: [] };
                    prevconnections.push(conexion);
                    console.log(prevconnections);
                }
            } );

            // Actualizar estado de conexiones
            setConnections(prevconnections);
        });

        // Verificar estado de conexiones cada 5 segundos
        setTimeout(() => {
            updateConnections();
        } , 10000);
    };

    useEffect(() => {
        console.log('EStado de conexiones actualizado: ');
        connections.forEach((conexion) => {
            console.log(conexion);
        });
    }, [connections]);

    const receiveMessage = ( connection, message ) => {
        console.log("Mensaje recibido: " + message);

        // Verificar si message(str)empieza con ?
        if (message.startsWith('?')) {
            // Obtener nombre de usuario
            let nombre = message.substring(1);
            // Agregar nombre de usuario a la conexión
            setConnections((prevConnections) => {
                const index = prevConnections.findIndex((conexion) => conexion.id === connection.peer);
                const newConnections = [...prevConnections];
                newConnections[index].usuario = nombre;
                return newConnections;
            } );

            return;
        }

        // Agregar mensaje al chat correspondiente
        setConnections((prevConnections) => {
            const index = prevConnections.findIndex((conexion) => conexion.id === connection.peer);
            const newConnections = [...prevConnections];
            newConnections[index].mensajes.push(message);
            return newConnections;
        } );
    };

    const connectToPeer = (targetId) => {

        // Verificar si está listo el peer
        if (!peer) {
            //log
            console.error('Hubo un error, el peer no está listo');
            return;
        }

        // Verificar si ya está conectado a este peer
        if ( connections.find((conexion) => conexion.id === targetId) ) {
            console.log('Ya estás conectado a este peer');
            return;
        }

        // Iniciar conexión
        console.log('Iniciando conexión');
        const conn = peer.connect(targetId);

        // Definir mensajes recibidos
        conn.on('data', (data) => {
            console.log(data);
            receiveMessage(conn, data);
        });

        // Definir conexión abierta
        conn.on('open', () => {
            console.log('Conexión abierta');
            // Enviar su nombre de usuario
            console.log('Enviando nombre de usuario');
            conn.send(`?${user.nombre}`);
        });

        // Agregar conexión al estado de conexiones
        const conexion = { id: conn.peer, usuario: conn.peer, connection: conn, estado: 'conectado', mensajes: [] };
        let newConnections = [...connections];
        newConnections.push(conexion);
        setConnections(newConnections);

        return conexion;
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
        
        // Enviar mensaje al chat seleccionado
        if (chatSelected) {
            // Encontrar conexión
            const conexion = connections.find((conexion) => conexion.id === chatSelected);
            // Enviar mensaje
            conexion.connection.send(message);
            // Agregar mensaje al chat
            setConnections((prevConnections) => {
                const index = prevConnections.findIndex((conexion) => conexion.id === chatSelected);
                const newConnections = [...prevConnections];
                newConnections[index].mensajes.push(message);
                return newConnections;
            } );
        }


    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            {peerId ? (                
                <>
                    {/* Listado de pares conectados */}
                    <Text style={{ marginBottom: 10 }}>Pares conectados:</Text>
                    <View style={{ height: 200, width: 300, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}>
                        {
                            connections.map((conexion, index) => (
                                <Text key={index}>{conexion.usuario}</Text>
                            ))
                        }
                    </View>

                    <Text style={{ marginBottom: 10 }}>ID de Peer: {peerId}</Text>
                    {/* input ingresar target-peer-id */}
                    {/* <Text style={{ marginBottom: 10 }}>ID de Peer a conectar:</Text>
                    <TextInput
                        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                        onChangeText={(text) => setTargetId(text)}
                        value={targetId}
                    />
                    <Button title="Conectar" onPress={() => connectToPeers()} /> */}

                    <TextInput
                        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                        onChangeText={(text) => setMsg(text)}
                        value={msg}
                    />
                    <Button title="Enviar Mensaje" onPress={() => sendMessage(msg)} />

                    {/* mostrar cada vez que se recibe un mensaje, scrolleable */}
                    <Text style={{ marginTop: 10 }}>Mensajes:</Text>
                    <View style={{ height: 200, width: 300, borderColor: 'gray', borderWidth: 1, marginTop: 10 }}>
                        {
                            chatSelected ? (
                                connections.find((conexion) => conexion.id === chatSelected).mensajes.map((mensaje, index) => (
                                    <Text key={index}>{mensaje}</Text>
                                ))
                            ) : (
                                <Text>Seleccione un chat</Text>
                            )
                            
                        }
                    </View>
                </>
            ) : (
                <Text>Cargando...</Text>
            )}
        </View>
    );
};

export default Chat;
