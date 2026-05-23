import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Catalogo.css';


export default function Catalogo() {
    const [produtos, setProdutos] = useState([]);
    const [categoriaSelecionada, setCategoriaSelecionada] = useState('Todos');
    const [idadeSelecionada, setIdadeSelecionada] = useState('Todos');
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:8080/api/brinquedos')
            .then((response) => response.json())
            .then((data) => setProdutos(data))
            .catch((error) => console.error('Erro ao buscar brinquedos:', error));
    }, []);

    // Filtro inteligente comparando strings exatas do banco
    const produtosFiltrados = produtos.filter((produto) => {
        const categoriaProduto = (produto.categoria || '').trim();
        const idadeProduto = (produto.idade || '').trim();

        const bateCategoria = categoriaSelecionada === 'Todos' ||
            categoriaProduto.toLowerCase() === categoriaSelecionada.toLowerCase();

        const bateIdade = idadeSelecionada === 'Todos' ||
            idadeProduto.toLowerCase() === idadeSelecionada.toLowerCase();

        return bateCategoria && bateIdade;
    });

    return (
        <div className="catalogo-container">
            <header className="navbar">
                <div className="logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
                    ✨ Caixa Mágica
                </div>
                <nav className="nav-links">
                    <span onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>Início</span>
                    <span onClick={() => navigate('/brinquedos')} style={{ cursor: 'pointer', fontWeight: 'bold' }}>Brinquedos</span>
                </nav>
            </header>

            <main className="catalogo-main">
                {/* BOTÃO DE VOLTAR PARA HOME ADICIONADO AQUI */}
                <button className="btn-voltar-home" onClick={() => navigate('/')}>
                    ← Voltar para o Início
                </button>

                <section className="catalogo-section">
                    <h2>Nossos Brinquedos</h2>

                    {/* FILTROS CORRIGIDOS COM OS NOVOS VALORES DO BANCO */}
                    <div className="filtros-container">
                        <div className="filtro-grupo">
                            <label>Categoria:</label>
                            <select
                                value={categoriaSelecionada}
                                onChange={(e) => setCategoriaSelecionada(e.target.value)}
                            >
                                <option value="Todos">Todas as categorias</option>
                                <option value="Infláveis">Infláveis</option>
                                <option value="Camas Elásticas">Camas Elásticas</option>
                                <option value="Jogos e Mesas">Jogos e Mesas</option>
                                <option value="Infantil Educativo">Infantil Educativo</option>
                            </select>
                        </div>

                        <div className="filtro-grupo">
                            <label>Idade recomendada:</label>
                            <select
                                value={idadeSelecionada}
                                onChange={(e) => setIdadeSelecionada(e.target.value)}
                            >
                                <option value="Todos">Todas as idades</option>
                                <option value="Até 3 anos">Até 3 anos</option>
                                <option value="4 a 8 anos">4 a 8 anos</option>
                                <option value="Acima de 8 anos">Acima de 8 anos</option>
                            </select>
                        </div>
                    </div>

                    {/* GRID DE PRODUTOS */}
                    <div className="produtos-grid">
                        {produtosFiltrados.length > 0 ? (
                            produtosFiltrados.map((produto) => (
                                <div
                                    key={produto.id}
                                    className="produto-card"
                                    onClick={() => navigate(`/produto/${produto.id}`)}
                                >
                                    <div className="produto-imagem-container">
                                        <img
                                            src={produto.imagemUrl}
                                            alt={produto.nome}
                                            className="produto-foto"
                                            onError={(e) => { e.target.src = 'https://via.placeholder.com/300x200?text=Caixa+Mágica'; }}
                                        />
                                    </div>

                                    <h3>{produto.nome}</h3>
                                    <p>{produto.descricao || 'Perfeito para garantir a diversão da sua festa!'}</p>

                                    <button className="btn-alugar">Alugar</button>
                                </div>
                            ))
                        ) : (
                            <p className="loading-text">Nenhum brinquedo encontrado para os filtros selecionados.</p>
                        )}
                    </div>
                </section>
            </main>

            <footer className="footer">
                <p>&copy; 2026 Caixa Mágica Locações - Diversão e Alegria Reservados.</p>
            </footer>
        </div>
    );
}