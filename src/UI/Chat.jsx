import React, { useEffect, useState } from 'react';
import { View, Text, Button, TextInput } from 'react-native';
import Peer from 'peerjs';
import { useFocusEffect } from '@react-navigation/native';
import { getUser } from '../services/auth.js';
import { set } from 'react-native-reanimated';


const Chat = () => {
    const [peerId, setPeerId] = useState(null);
    const [peer, setPeer] = useState(null);
    const [msg, setMsg] = useState(''); // Estado para almacenar el mensaje a enviar
    const [user, setUser] = useState(null); // Estado para almacenar el usuario

    const [connections, setConnections] = useState([]); // Estado para almacenar las conexiones {id, usuario, connection, estado, mensajes}
    const [chatSelected, setChatSelected] = useState(null); // Estado para almacenar el chat seleccionado (id de usuario)

    // conexiones entrantes
    // var connectionsIncoming = [];
    const [connectionsIncoming, setConnectionsIncoming] = useState([]); // Estado para almacenar las conexiones entrantes

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
            
            // Definir mensajes recibidos
            setConnections((prevConnections) => {
                const newConnections = [...prevConnections];
                const conn = { id: connection.peer, usuario: connection.peer, connection: connection, estado: 'conectado', mensajes: [] }
                console.log('Conexión entrante de ');
                console.log(conn);
                newConnections.push(conn);
                return newConnections;
            } );


            // Enviar su nombre de usuario
            console.log('Enviando nombre de usuario' + user.nombre);
            connection.send(`?${user.nombre}`);

            // Definir mensajes recibidos
            connection.on('data', (data) => {
                console.log(data);
                receiveMessage(connection, data);
            } );
            
        });

        // Obtener lista de pares conectados
        findAllConnections();

    }, [peer, peerId]);

    // Verificar si hay conexiones entrantes
    useEffect(() => {
        // Verificar si hay conexiones entrantes
        if (connectionsIncoming.length === 0) {
            return;
        }

        // console.log('Conexiones entrantes: ' + connectionsIncoming.length);

        // Agregar conexiones entrantes al estado de conexiones
        setConnections((prevConnections) => {
            const newConnections = [...prevConnections];

            connectionsIncoming.forEach((connectionId) => {

                // Verificar si no es el mismo usuario
                if (connectionId === peerId) {
                    // console.log('Es el mismo usuario');
                    return;
                }
                console.log('Conexión entrante de ' + connectionId);

                // Verificar si ya está conectado a este peer
                if ( newConnections.find((conexion) => conexion.id === connectionId) ) {
                    // console.log('Ya estás conectado a este peer');
                    return;
                }

                // Crear conexión
                console.log('Iniciando conexión con ' + connectionId);
                const conn = peer.connect(connectionId);
                
                // Agregar conexión al estado de conexiones
                const conexion = { id: conn.peer, usuario: conn.peer, connection: conn, estado: 'conectado', mensajes: [] };
                newConnections.push(conexion);

                // Definir mensajes recibidos
                conn.on('data', (data) => {
                    console.log(data);
                    receiveMessage(conn, data);
                });

                // Definir conexión abierta
                conn.on('open', () => {
                    console.log('Conexión abierta');
                    // Enviar su nombre de usuario
                    console.log('Enviando nombre de usuario ' + user.nombre);
                    conn.send(`?${user.nombre}`);
                });


            });
            return newConnections;
        } );

        // Limpiar conexiones entrantes
        setConnectionsIncoming([]);
        
    }, [connectionsIncoming]);

    // Buscar conexiones que no estén conectadas
    const findAllConnections = () => {
        peer.listAllPeers((peers) => {
            // Obtener lista y agregar a conexiones entrantes
            setConnectionsIncoming((prevConnectionsIncoming) => {
                const newConnectionsIncoming = [...prevConnectionsIncoming];
                newConnectionsIncoming.push(...peers);
                return newConnectionsIncoming;
            } );
        });

        // Ejecutar cada 5 segundos
        setTimeout(findAllConnections, 5000);
    };
    
    // 
    const receiveMessage = ( connection, message ) => {
        console.log("Mensaje recibido: " + message);

        // Verificar si message(str)empieza con ?
        if (message.startsWith('?')) {
            // Obtener nombre de usuario
            let nombre = message.substring(1);
            console.log('Nombre de usuario: ' + nombre);
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
        console.log('Iniciando conexión con ' + targetId);
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
                                <Text key={index} onPress={() => setChatSelected(conexion.id)}>{conexion.usuario}</Text>
                            ))
                        }
                    </View>

                    <Text style={{ marginBottom: 10 }}>ID de Peer: {peerId}</Text>

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
