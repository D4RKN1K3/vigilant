import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// Importar las vistas que se van a utilizar
import Home from '../UI/Home';
import Main from '../UI/Main';
import Ejemplo from '../UI/ejemplo';
import Register from '../UI/Register';
import Login from '../UI/Login';
import Alertas from '../UI/Alertas'
import { createDrawerNavigator } from '@react-navigation/drawer';

// Crear la función del navigation drawer
function HomeDrawer() {
    const Drawer = createDrawerNavigator();
    return (
        <Drawer.Navigator>
            {/* cambiar este component por Home una vez este el server funcionando */}
            <Drawer.Screen name="Home" component={Main} options={{ title: 'Vigilant - Alarma vecinal'}}/>
            <Drawer.Screen name="Ejemplo" component={Ejemplo} />
            <Drawer.Screen name="Alertas" component={Alertas} options={{ title: 'Vigilant - Últimas alertas' }}/>
        </Drawer.Navigator>
    );
}

export default function Rutas() {
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator>
            {/* Cada ruta debe agregarse de esta forma, siendo la primera ruta la principal.
                name: Nombre de la ruta, se usa para referenciarla en el navigation.navigate() dentro de cada vista (para cambiar de vista).
                component: Nombre del componente que se va a renderizar, el mismo que le ponemos al importarlo.
                options: Opciones de la vista, como el titulo de la barra de navegacion, el color de fondo, etc. 
             */}

            <Stack.Screen name="HomeDrawer" component={HomeDrawer} options={{ title: 'Vigilant - Alarma vecinal', headerShown: false}}/>
            <Stack.Screen name="Main" component={Main} options={{ title: 'Vigilant - Alarma vecinal', headerShown: false }}/>
            <Stack.Screen name="Ejemplo" component={Ejemplo} options={{ title: 'Ejemplo' }}/>
            <Stack.Screen name="Register" component={Register} options={{ title: 'Registro' }}/>
            <Stack.Screen name="Login" component={Login} options={{ title: 'Inicio de sesion' }}/>
        </Stack.Navigator>
    );
}