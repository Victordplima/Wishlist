import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { cores } from '../utils/cores';
import { useUser } from '../context/userContext';

const InicioTela = () => {
    const { userData } = useUser();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Bem-vindo, {userData.nome}!</Text>
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
    title: {
        fontSize: 24,
        color: cores.primary,
    },
});

export default InicioTela;