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
            <View style={styles.infoContainer}>
                <Image source={{ uri: item.urlImagem }} style={styles.imagem} />
                <View style={styles.textContainer}>
                    <Text style={styles.nome}>{item.nome}</Text>
                    <Text style={styles.preco}>Preço: R$ {item.preco.toFixed(2)}</Text>
                </View>
            </View>
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
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        paddingHorizontal: 8,
        paddingVertical: 12,
        borderRadius: 8,
        borderColor: cores.black,
        borderWidth: 1,
        backgroundColor: cores.white,
    },
    infoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    textContainer: {
        flex: 1,
        marginLeft: 8,
    },
    imagem: {
        width: 100,
        height: 100,
        borderRadius: 8,
    },
    nome: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    preco: {
        fontSize: 16,
        marginBottom: 4,
    },
    botaoListaDesejos: {
        position: 'absolute',
        top: 8,
        right: 8,
    },
});

export default ProdutosTela;
