import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, Alert, Image } from 'react-native';
import { criarUsuario } from '../utils/http';
import { cores } from '../utils/cores';

// Importe sua imagem de logo
import LogoImage from '../assets/logo.png';

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
        <View style={styles.container}>
            <Image source={LogoImage} style={styles.logo} />

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
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        backgroundColor: cores.light, // Cor de fundo
    },
    formContainer: {
        width: '100%',
        alignItems: 'center',
        marginBottom: 20, // Espaço abaixo do formulário
    },
    logo: {
        width: 150, // Ajuste a largura conforme necessário
        height: 75, // Ajuste a altura conforme necessário
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        marginBottom: 16,
        textAlign: 'center',
        color: cores.primary, // Cor do título
    },
    input: {
        borderWidth: 1,
        borderColor: cores.secondary, // Cor da borda
        padding: 8,
        marginVertical: 8,
        borderRadius: 4,
        width: '80%', // Largura do input
    },
    button: {
        backgroundColor: cores.primary, // Cor do botão
        padding: 10,
        borderRadius: 4,
        marginTop: 10,
        width: '80%', // Largura do botão
    },
    buttonText: {
        fontSize: 16,
        color: cores.light, // Cor do texto do botão
        textAlign: 'center',
    },
    loginText: {
        color: cores.gray, // Cor do texto do link de login
        //textDecorationLine: 'underline',
    },
});

export default CadastroTela;
