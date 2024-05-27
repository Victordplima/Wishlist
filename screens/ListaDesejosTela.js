import React, { useState, useEffect, useContext } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { cores } from '../utils/cores';
import { obterProdutosListaDesejos, removerProdutoListaDesejos } from '../utils/http';
import { Ionicons } from '@expo/vector-icons';
import { useUser } from '../context/userContext';

const ListaDesejosTela = () => {
    const { userData } = useUser();
    const [produtosListaDesejos, setProdutosListaDesejos] = useState([]);

    useEffect(() => {
        const carregarProdutosListaDesejos = async () => {
            try {
                const produtos = await obterProdutosListaDesejos(userData.email); // Use o email do usuário do contexto
                setProdutosListaDesejos(produtos);
            } catch (error) {
                console.error('Erro ao carregar produtos na lista de desejos:', error);
            }
        };
        carregarProdutosListaDesejos();
    }, [userData.email]); // Certifique-se de incluir o email do usuário como dependência

    const handleRemoverListaDesejos = async (produto) => {
        try {
            await removerProdutoListaDesejos(produto.produtoId, userData.email); // Use o email do usuário do contexto
            setProdutosListaDesejos(produtosListaDesejos.filter((p) => p.produtoId !== produto.produtoId));
            Alert.alert('Sucesso', 'Produto removido da lista de desejos!');
        } catch (error) {
            console.error('Erro ao remover produto da lista de desejos:', error);
            Alert.alert('Erro', 'Falha ao remover produto da lista de desejos');
        }
    };

    const calcularValorTotal = () => {
        return produtosListaDesejos.reduce((total, produto) => total + produto.preco, 0).toFixed(2);
    };

    const renderProduto = ({ item }) => (
        <View style={styles.item}>
            <Image source={{ uri: item.urlImagem }} style={styles.imagem} />
            <Text style={styles.nome}>{item.nome}</Text>
            <Text style={styles.preco}>Preço: R$ {item.preco.toFixed(2)}</Text>
            <TouchableOpacity
                style={styles.botaoRemover}
                onPress={() => handleRemoverListaDesejos(item)}
            >
                <Ionicons name="trash-outline" size={24} color="black" />
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Lista de Desejos</Text>
            <FlatList
                data={produtosListaDesejos}
                keyExtractor={(item) => item.produtoId.toString()}
                renderItem={renderProduto}
            />
            <Text style={styles.total}>Valor Total: R$ {calcularValorTotal()}</Text>
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
    botaoRemover: {
        position: 'absolute',
        top: 8,
        right: 8,
    },
    total: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 20,
    },
});

export default ListaDesejosTela;
