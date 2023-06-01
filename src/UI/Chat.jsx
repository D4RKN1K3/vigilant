import React, { useEffect, useState } from 'react';
import { View, Text, Button, TextInput } from 'react-native';
import Peer from 'peerjs';
import { useIsFocused } from "@react-navigation/native";

const Chat = () => {
const [peerId, setPeerId] = useState(null);
const [peer, setPeer] = useState(null);
const [targetId, setTargetId] = useState('');
const [msg, setMsg] = useState('');
const [conectedPeers, setconectedPeers] = useState([]);

// Verificar si la vista esta enfocada
const isFocused = useIsFocused();


useEffect(() => {
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
			
			// Manejar mensajes entrantes
			connection.on('data', (data) => {
				console.log('Mensaje recibido:', data);
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
}, [isFocused]);

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
		console.log('Mensaje recibido:', data);
	});

	//agregar par conectado
	setconectedPeers([...conectedPeers, targetId]);
};

const sendMessage = (message) => {
	if (!peer) {
	return;
	}

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
