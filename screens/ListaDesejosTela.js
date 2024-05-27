import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, Alert, RefreshControl } from 'react-native';
import { cores } from '../utils/cores';
import { obterProdutosListaDesejos, removerProdutoListaDesejos } from '../utils/http';
import { Ionicons } from '@expo/vector-icons';
import { useUser } from '../context/userContext';

const ListaDesejosTela = () => {
    const { userData } = useUser();
    const [produtosListaDesejos, setProdutosListaDesejos] = useState([]);
    const [quantidades, setQuantidades] = useState({});
    const [refreshing, setRefreshing] = useState(false);

    const carregarProdutosListaDesejos = async () => {
        try {
            const produtos = await obterProdutosListaDesejos(userData.email);
            setProdutosListaDesejos(produtos);
            const initialQuantities = {};
            produtos.forEach(produto => {
                initialQuantities[produto.produtoId] = 1;
            });
            setQuantidades(initialQuantities);
        } catch (error) {
            console.error('Erro ao carregar produtos na lista de desejos:', error);
        }
    };

    useEffect(() => {
        carregarProdutosListaDesejos();
    }, [userData.email]);

    const onRefresh = async () => {
        setRefreshing(true);
        await carregarProdutosListaDesejos();
        setRefreshing(false);
    };

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

    const handleIncreaseQuantity = (produtoId) => {
        setQuantidades(prevQuantidades => ({
            ...prevQuantidades,
            [produtoId]: prevQuantidades[produtoId] + 1,
        }));
    };

    const handleDecreaseQuantity = (produtoId) => {
        setQuantidades(prevQuantidades => ({
            ...prevQuantidades,
            [produtoId]: prevQuantidades[produtoId] > 1 ? prevQuantidades[produtoId] - 1 : 1,
        }));
    };

    const calcularValorTotal = () => {
        return produtosListaDesejos.reduce((total, produto) => total + produto.preco * quantidades[produto.produtoId], 0).toFixed(2);
    };

    const renderProduto = ({ item }) => (
        <View style={styles.item}>
            <View style={styles.infoContainer}>
                <Image source={{ uri: item.urlImagem }} style={styles.imagem} />
                <View style={styles.textContainer}>
                    <Text style={styles.nome}>{item.nome}</Text>
                    <Text style={styles.preco}>Preço: R$ {item.preco.toFixed(2)}</Text>
                    <View style={styles.quantityContainer}>
                        <TouchableOpacity onPress={() => handleDecreaseQuantity(item.produtoId)}>
                            <Ionicons name="remove-circle-outline" size={24} color="black" />
                        </TouchableOpacity>
                        <Text style={styles.quantity}>{quantidades[item.produtoId]}</Text>
                        <TouchableOpacity onPress={() => handleIncreaseQuantity(item.produtoId)}>
                            <Ionicons name="add-circle-outline" size={24} color="black" />
                        </TouchableOpacity>
                    </View>
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
            <FlatList
                data={produtosListaDesejos}
                keyExtractor={(item) => item.produtoId.toString()}
                renderItem={renderProduto}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
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
        backgroundColor: cores.light,
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
        paddingHorizontal: 8,
        paddingVertical: 12,
        borderRadius: 8,
        borderColor: cores.black,
        borderWidth: 1,
        marginHorizontal: 15,
        position: 'relative',
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
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
    },
    quantity: {
        fontSize: 16,
        marginHorizontal: 8,
    },
    botaoRemover: {
        position: 'absolute',
        bottom: 8,
        right: 8,
    },
    totalContainer: {
        alignItems: 'center',
        backgroundColor: cores.primary,
        paddingVertical: 10,
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
