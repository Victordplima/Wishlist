import React from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useUser } from '../context/userContext';
import { cores } from '../utils/cores';

const PerfilTela = () => {
    const { userData } = useUser();
    const navigation = useNavigation();

    // URL da imagem do avatar
    const avatarUrl = `https://avatar.iran.liara.run/public/15`;

    const handleListaDesejosPress = () => {
        navigation.navigate('ListaDesejos'); // Navegar para a tela de Lista de Desejos
    };

    return (
        <View style={styles.container}>
            <View style={styles.profileContainer}>
                <Image source={{ uri: avatarUrl }} style={styles.profileImage} />
                <Text style={styles.name}>{userData.nome}</Text>
                <Text style={styles.email}>{userData.email}</Text>
            </View>
            <Pressable onPress={handleListaDesejosPress}>
                <View style={styles.card}>
                    <Text style={styles.cardText}>Lista de Desejos</Text>
                </View>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: cores.light,
    },
    profileContainer: {
        alignItems: 'center',
    },
    profileImage: {
        width: 150,
        height: 150,
        borderRadius: 75,
        marginBottom: 20,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    email: {
        fontSize: 18,
    },
    card: {
        backgroundColor: cores.primary,
        width: '80%',
        padding: 20,
        borderRadius: 10,
        marginTop: 20,
        alignItems: 'center',
    },
    cardText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
    },
});

export default PerfilTela;
