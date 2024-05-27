// LoginTela.js
import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, Alert, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { cores } from '../utils/cores';
import LogoImage from '../assets/logo.png';
import { obterUsuario } from '../utils/http';
import { useUser } from '../context/userContext';

const LoginTela = () => {
    const [email, setEmail] = useState('');
    const navigation = useNavigation();
    const { loginUser } = useUser();

    const handleLogin = async () => {
        try {
            const usuario = await obterUsuario(email);
            if (usuario) {
                loginUser(usuario);
                navigation.navigate('Logado', { screen: 'Inicio' });
            } else {
                Alert.alert('Erro', 'Email inválido');
            }
        } catch (error) {
            console.error('Erro ao verificar status de login:', error);
            Alert.alert('Erro', 'Falha ao obter dados do usuário');
        }
    };

    return (
        <View style={styles.container}>
            <Image source={LogoImage} style={styles.logo} />
            <View style={styles.formContainer}>
                <Text style={styles.title}>Login</Text>
                <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
                <Pressable style={styles.button} onPress={handleLogin}>
                    <Text style={styles.buttonText}>Login</Text>
                </Pressable>
            </View>
            <Pressable onPress={() => navigation.navigate('Cadastro')}>
                <Text style={styles.loginText}>Não possui uma conta? Cadastre-se</Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        backgroundColor: cores.light,
    },
    formContainer: {
        width: '100%',
        alignItems: 'center',
        marginBottom: 20,
    },
    logo: {
        width: 150,
        height: 75,
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        marginBottom: 16,
        textAlign: 'center',
        color: cores.primary,
    },
    input: {
        borderWidth: 1,
        borderColor: cores.secondary,
        padding: 8,
        marginVertical: 8,
        borderRadius: 4,
        width: '80%',
    },
    button: {
        backgroundColor: cores.primary,
        padding: 10,
        borderRadius: 4,
        marginTop: 10,
        width: '80%',
    },
    buttonText: {
        fontSize: 16,
        color: cores.light,
        textAlign: 'center',
    },
    loginText: {
        color: cores.gray,
    },
});

export default LoginTela;
