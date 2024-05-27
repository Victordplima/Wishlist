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
                const produtos = await obterProdutosListaDesejos(userData.email);
                setProdutosListaDesejos(produtos);
            } catch (error) {
                console.error('Erro ao carregar produtos na lista de desejos:', error);
            }
        };
        carregarProdutosListaDesejos();
    }, [userData.email]);

    const handleRemoverListaDesejos = async (produto) => {
        try {
            await removerProdutoListaDesejos(produto.produtoId, userData.email);
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
            <View style={styles.infoContainer}>
                <Image source={{ uri: item.urlImagem }} style={styles.imagem} />
                <View style={styles.textContainer}>
                    <Text style={styles.nome}>{item.nome}</Text>
                    <Text style={styles.preco}>Preço: R$ {item.preco.toFixed(2)}</Text>
                </View>
            </View>
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
            <View style={styles.totalContainer}>
                <Text style={styles.totalTitle}>Valor total:</Text>
                <Text style={styles.totalValue}>R$ {calcularValorTotal()}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //padding: 16,
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
        margin: 15,
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
    botaoRemover: {
        position: 'absolute',
        top: 8,
        right: 8,
    },
    totalContainer: {
        alignItems: 'center',
        marginTop: 20,
        backgroundColor: cores.primary,
    },
    totalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white'
    },
    totalValue: {
        fontSize: 20,
        color: 'white'
    },
});

export default ListaDesejosTela;
