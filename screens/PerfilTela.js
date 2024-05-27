import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { cores } from '../utils/cores';
import { useUser } from '../context/userContext'; // Importe o hook useUser

const PerfilTela = () => {
    const { userData } = useUser(); // Use o hook useUser para acessar o contexto de usuário

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Perfil</Text>
            {userData ? (
                <>
                    <View style={styles.infoContainer}>
                        <Text style={styles.label}>Nome:</Text>
                        <Text style={styles.info}>{userData.nome}</Text>
                    </View>
                    <View style={styles.infoContainer}>
                        <Text style={styles.label}>Email:</Text>
                        <Text style={styles.info}>{userData.email}</Text>
                    </View>
                </>
            ) : (
                <Text style={styles.info}>Carregando...</Text>
            )}
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
        marginBottom: 16,
        textAlign: 'center',
        color: cores.primary,
    },
    infoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    label: {
        fontWeight: 'bold',
        marginRight: 8,
    },
    info: {
        fontSize: 16,
    },
});

export default PerfilTela;
