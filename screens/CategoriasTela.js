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
            <Text style={styles.itemText}>{item.nome}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
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
    item: {
        padding: 16,
        marginBottom: 8,
        backgroundColor: cores.white,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: cores.secondary,
    },
    itemText: {
        fontSize: 18,
        color: cores.primary,
    },
});

export default CategoriasTela;
