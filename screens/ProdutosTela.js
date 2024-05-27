import React, { useState, useEffect, useContext } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { cores } from '../utils/cores';
import { obterProdutosPorCategoria, adicionarProdutoListaDesejos, removerProdutoListaDesejos, obterProdutosListaDesejos } from '../utils/http';
import { Ionicons } from '@expo/vector-icons';
import { useUser } from '../context/userContext';

const ProdutosTela = ({ route }) => {
    const { categoria } = route.params;
    const [produtos, setProdutos] = useState([]);
    const { userData } = useUser();
    const [produtosListaDesejos, setProdutosListaDesejos] = useState([]);

    useEffect(() => {
        const carregarProdutos = async () => {
            try {
                const produtosData = await obterProdutosPorCategoria(categoria.categoriaId, userData.email);
                setProdutos(produtosData);
            } catch (error) {
                console.error('Erro ao carregar produtos:', error);
            }
        };
        carregarProdutos();
    }, [categoria, userData.email]);

    useEffect(() => {
        const carregarProdutosFavoritos = async () => {
            try {
                const produtosFavoritos = await obterProdutosListaDesejos(userData.email);
                setProdutosListaDesejos(produtosFavoritos.map(produto => produto.produtoId));
            } catch (error) {
                console.error('Erro ao carregar produtos favoritos:', error);
            }
        };
        carregarProdutosFavoritos();
    }, [userData.email]);

    const handleAdicionarListaDesejos = async (produto) => {
        try {
            await adicionarProdutoListaDesejos(produto.produtoId, userData.email);
            setProdutosListaDesejos([...produtosListaDesejos, produto.produtoId]);
            Alert.alert('Sucesso', 'Produto adicionado à lista de desejos!');
        } catch (error) {
            console.error('Erro ao adicionar produto à lista de desejos:', error);
            Alert.alert('Erro', 'Falha ao adicionar produto à lista de desejos');
        }
    };

    const handleRemoverListaDesejos = async (produto) => {
        try {
            await removerProdutoListaDesejos(produto.produtoId, userData.email);
            setProdutosListaDesejos(produtosListaDesejos.filter((id) => id !== produto.produtoId));
            Alert.alert('Sucesso', 'Produto removido da lista de desejos!');
        } catch (error) {
            console.error('Erro ao remover produto da lista de desejos:', error);
            Alert.alert('Erro', 'Falha ao remover produto da lista de desejos');
        }
    };

    const isProdutoNaListaDesejos = (produtoId) => produtosListaDesejos.includes(produtoId);

    const renderProduto = ({ item }) => (
        <View style={styles.item}>
            <Image source={{ uri: item.urlImagem }} style={styles.imagem} />
            <Text style={styles.nome}>{item.nome}</Text>
            <Text style={styles.preco}>Preço: R$ {item.preco.toFixed(2)}</Text>
            <TouchableOpacity
                style={styles.botaoListaDesejos}
                onPress={() =>
                    isProdutoNaListaDesejos(item.produtoId)
                        ? handleRemoverListaDesejos(item)
                        : handleAdicionarListaDesejos(item)
                }
            >
                <Ionicons name={isProdutoNaListaDesejos(item.produtoId) ? 'heart' : 'heart-outline'} size={24} color={isProdutoNaListaDesejos(item.produtoId) ? 'red' : 'black'} />
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Produtos - {categoria.nome}</Text>
            <FlatList
                data={produtos}
                keyExtractor={(item) => item.produtoId.toString()}
                renderItem={renderProduto}
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
        textAlign: 'center',
    },
    item: {
        marginBottom: 16,
    },
    imagem: {
        width: '100%',
        height: 200,
        marginBottom: 8,
        borderRadius: 8,
    },
    nome: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    preco: {
        fontSize: 16,
        marginBottom: 8,
    },
    botaoListaDesejos: {
        position: 'absolute',
        top: 8,
        right: 8,
    },
});

export default ProdutosTela;
