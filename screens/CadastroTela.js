import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, Alert, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { cores } from '../utils/cores';
import LogoImage from '../assets/logo.png';
import { criarUsuario } from '../utils/http';

const CadastroTela = ({ navigation }) => {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');

    const handleSignUp = async () => {
        if (nome && email) {
            try {
                await criarUsuario(nome, email);
                Alert.alert('Sucesso', 'Usuário registrado com sucesso', [{ text: 'OK', onPress: () => navigation.navigate('Login') }]);
            } catch (e) {
                Alert.alert('Erro', 'Falha ao registrar usuário');
            }
        } else {
            Alert.alert('Erro', 'Por favor, preencha todos os campos');
        }
    };

    return (
        <>
            <View style={styles.logoContainer}>
                <Image source={LogoImage} style={styles.logo} />
            </View>
            <View style={styles.container}>
                <View style={styles.formContainer}>
                    <Text style={styles.title}>Cadastro</Text>
                    <TextInput style={styles.input} placeholder="Nome" value={nome} onChangeText={setNome} />
                    <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
                    <Pressable style={styles.button} onPress={handleSignUp}>
                        <Text style={styles.buttonText}>Cadastrar</Text>
                    </Pressable>
                </View>
                <Pressable onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.loginText}>Já possui uma conta? Fazer login</Text>
                </Pressable>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    logoContainer: {
        marginTop: 100,
        alignSelf: 'center',
    },
    logo: {
        width: 150,
        height: 75,
    },
    formContainer: {
        width: '100%',
        alignItems: 'center',
        marginBottom: 20,
    },
    title: {
        fontSize: 32,
        marginBottom: 32,
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
        marginTop: 20,
    },
});

export default CadastroTela;
