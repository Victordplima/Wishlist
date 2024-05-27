import axios from 'axios';

const api = axios.create({
    baseURL: 'https://listadesejo.azurewebsites.net/api',
});

// Função para obter todas as categorias
export const obterCategorias = async () => {
    try {
        const response = await api.get('/categorias');
        return response.data;
    } catch (error) {
        console.error('Erro ao obter categorias:', error);
        throw error;
    }
};

// Função para obter produtos por categoria e email do usuário
export const obterProdutosPorCategoria = async (categoriaId, email) => {
    try {
        const response = await api.get(`/produtos/${categoriaId}/${email}`);
        return response.data;
    } catch (error) {
        console.error('Erro ao obter produtos por categoria:', error);
        throw error;
    }
};

// Função para criar um usuário
export const criarUsuario = async (nome, email) => {
    try {
        const response = await api.post('/usuario', { nome, email });
        return response.data;
    } catch (error) {
        console.error('Erro ao criar usuário:', error);
        throw error;
    }
};

// Função para obter um usuário por email
export const obterUsuario = async (email) => {
    try {
        const response = await api.get(`/usuario/${email}`);
        return response.data;
    } catch (error) {
        console.error('Erro ao obter usuário:', error);
        throw error;
    }
};

export const obterProdutosListaDesejos = async (email) => {
    try {
        const response = await api.get(`/listadesejo/${email}`);
        return response.data;
    } catch (error) {
        console.error('Erro ao obter produtos na lista de desejos:', error);
        throw error;
    }
};

// Função para obter IDs dos produtos na lista de desejos de um usuário
export const obterProdutosIdsListaDesejos = async (email) => {
    try {
        const response = await api.get(`/listadesejo/${email}/produtosIds`);
        return response.data;
    } catch (error) {
        console.error('Erro ao obter IDs dos produtos na lista de desejos:', error);
        throw error;
    }
};

// Função para adicionar produto à lista de desejos de um usuário
export const adicionarProdutoListaDesejos = async (produtoId, email) => {
    try {
        const response = await api.post(`/listadesejo/${produtoId}/${email}`);
        return response.data;
    } catch (error) {
        console.error('Erro ao adicionar produto à lista de desejos:', error);
        throw error;
    }
};

// Função para remover produto da lista de desejos de um usuário
export const removerProdutoListaDesejos = async (produtoId, email) => {
    try {
        const response = await api.delete(`/listadesejo/${produtoId}/${email}`);
        return response.data;
    } catch (error) {
        console.error('Erro ao remover produto da lista de desejos:', error);
        throw error;
    }
};
