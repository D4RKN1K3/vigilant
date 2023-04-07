import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// Importar las vistas que se van a utilizar
import Main from '../UI/Main';
import Ejemplo from '../UI/ejemplo';
import Register from '../UI/Register';
import Botones from '../components/botones';
import Login from '../UI/Login';

export default function Rutas() {
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator>
            {/* Cada ruta debe agregarse de esta forma, siendo la primera ruta la principal.
                name: Nombre de la ruta, se usa para referenciarla en el navigation.navigate() dentro de cada vista (para cambiar de vista).
                component: Nombre del componente que se va a renderizar, el mismo que le ponemos al importarlo.
                options: Opciones de la vista, como el titulo de la barra de navegacion, el color de fondo, etc. 
             */}
            <Stack.Screen name="Main" component={Main} options={{ title: 'Vigilant - Alarma vecinal' }}/>
            <Stack.Screen name="Ejemplo" component={Ejemplo} options={{ title: 'Ejemplo' }}/>
            <Stack.Screen name="Register" component={Register} options={{ title: 'Registro' }}/>
            <Stack.Screen name="Login" component={Login} options={{ title: 'Inicio de sesion' }}/>
        </Stack.Navigator>
    );
}