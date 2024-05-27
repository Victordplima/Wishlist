import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { cores } from '../utils/cores';
import { obterCategorias } from '../utils/http';

const CategoriasTela = ({ navigation }) => {
    const [categorias, setCategorias] = useState([]);

    useEffect(() => {
        const carregarCategorias = async () => {
            try {
                const categoriasData = await obterCategorias();
                setCategorias(categoriasData);
            } catch (error) {
                console.error('Erro ao carregar categorias:', error);
            }
        };
        carregarCategorias();
    }, []);

    const handleCategoriaSelecionada = (categoria) => {
        navigation.navigate('Produtos', { categoria });
    };

    const renderCategoria = ({ item }) => (
        <TouchableOpacity style={styles.item} onPress={() => handleCategoriaSelecionada(item)}>
            <Text>{item.nome}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Categorias</Text>
            <FlatList
                data={categorias}
                keyExtractor={(item) => item.categoriaId.toString()}
                renderItem={renderCategoria}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: cores.light,
    },
    title: {
        fontSize: 24,
        marginBottom: 8,
        color: cores.primary,
    },
    item: {
        padding: 12,
        marginBottom: 8,
        borderWidth: 1,
        borderColor: cores.secondary,
        borderRadius: 8,
    },
});

export default CategoriasTela;
