import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CadastroTela from './screens/CadastroTela';
import LoginTela from './screens/LoginTela';
import InicioTela from './screens/InicioTela';
import PerfilTela from './screens/PerfilTela';
import CategoriasTela from './screens/CategoriasTela';
import ProdutosTela from './screens/ProdutosTela'; // Importe a tela de produtos
import ListaDesejosTela from './screens/ListaDesejosTela'; // Importe a tela de lista de desejos
import { UserProvider } from './context/userContext';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const AuthStack = () => (
    <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Cadastro" component={CadastroTela} options={{ title: 'Cadastro' }} />
        <Stack.Screen name="Login" component={LoginTela} options={{ title: 'Login' }} />
    </Stack.Navigator>
);

const Logado = () => (
    <Tab.Navigator>
        <Tab.Screen name="Inicio" component={InicioTela} options={{ title: 'Inicio' }} />
        <Tab.Screen name="Perfil" component={PerfilTela} options={{ title: 'Perfil' }} />
        {/* Adicione a navegação para Categorias e Lista de Desejos */}
        <Tab.Screen name="Categorias" component={CategoriasStackNavigator} options={{ title: 'Categorias' }} />
        <Tab.Screen name="ListaDesejos" component={ListaDesejosTela} options={{ title: 'Lista de Desejos' }} />
    </Tab.Navigator>
);

// Defina um StackNavigator para as telas de Categorias e Produtos
const CategoriasStackNavigator = () => (
    <Stack.Navigator>
        <Stack.Screen name="ListaCategorias" component={CategoriasTela} options={{ title: 'ListaCategorias' }} />
        <Stack.Screen name="Produtos" component={ProdutosTela} options={{ title: 'Produtos' }} />
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

export default App;
