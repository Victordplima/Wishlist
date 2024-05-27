import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, Image, StyleSheet } from 'react-native';
import { cores } from './utils/cores';
import CadastroTela from './screens/CadastroTela';
import LoginTela from './screens/LoginTela';
import InicioTela from './screens/InicioTela';
import PerfilTela from './screens/PerfilTela';
import CategoriasTela from './screens/CategoriasTela';
import ProdutosTela from './screens/ProdutosTela';
import ListaDesejosTela from './screens/ListaDesejosTela';
import { UserProvider } from './context/userContext';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const AuthStack = () => (
    <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Cadastro" component={CadastroTela} options={{ title: 'Cadastro' }} />
        <Stack.Screen name="Login" component={LoginTela} options={{ title: 'Login' }} />
    </Stack.Navigator>
);

const ListaDesejosHeader = () => (
    <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Lista de Desejos </Text>
        <Image source={require('./assets/estrela.png')} style={styles.headerImage} />
    </View>
);

const Logado = () => (
    <Tab.Navigator
        screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
                let iconName;

                if (route.name === 'Inicio') {
                    iconName = focused ? 'home' : 'home-outline';
                } else if (route.name === 'Perfil') {
                    iconName = focused ? 'person' : 'person-outline';
                } else if (route.name === 'Categorias') {
                    iconName = focused ? 'grid' : 'grid-outline';
                } else if (route.name === 'ListaDesejos') {
                    iconName = focused ? 'heart' : 'heart-outline';
                }

                return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: cores.primary,
            tabBarInactiveTintColor: 'gray',
            tabBarStyle: {
                display: 'flex',
            },
        })}
    >
        <Tab.Screen name="Categorias" component={CategoriasStackNavigator} options={{ title: 'Categorias' }} />
        <Tab.Screen name="Perfil" component={PerfilTela} options={{ title: 'Perfil' }} />
        <Tab.Screen name="ListaDesejos" component={ListaDesejosTela} options={{ headerTitle: ListaDesejosHeader, title: 'Lista de Desejos' }} />
    </Tab.Navigator>
);

const CategoriasStackNavigator = () => (
    <Stack.Navigator>
        <Stack.Screen name="ListaCategorias" component={CategoriasTela} options={{ headerShown: false }} />
        <Stack.Screen name="Produtos" component={ProdutosTela} options={{ headerShown: false }} />
    </Stack.Navigator>
);

const App = () => {
    return (
        <NavigationContainer>
            <UserProvider>
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="Auth" component={AuthStack} />
                    <Stack.Screen name="Logado" component={Logado} />
                </Stack.Navigator>
            </UserProvider>
        </NavigationContainer>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerImage: {
        width: 18,
        height: 18,
        marginRight: 8,
        resizeMode: 'contain',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default App;
