import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ProductDetail.css';

export default function ProductDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [brinquedo, setBrinquedo] = useState(null);
    const [loading, setLoading] = useState(true);

    // Estado para controlar o período selecionado (padrão: 1 dia)
    const [diasSelecionados, setDiasSelecionados] = useState(1);

    useEffect(() => {
        fetch(`http://localhost:8080/api/brinquedos/${id}`)
            .then((response) => response.json())
            .then((data) => {
                setBrinquedo(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Erro ao buscar detalhes do brinquedo:', error);
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return (
            <div className="detalhe-container">
                <p className="loading-text">Carregando detalhes do brinquedo...</p>
            </div>
        );
    }

    if (!brinquedo) {
        return (
            <div className="detalhe-container">
                <div className="detalhe-erro">
                    <h2>Brinquedo não encontrado! 😢</h2>
                    <button className="btn-confirmar-aluguel" onClick={() => navigate('/brinquedos')}>
                        Voltar para o Catálogo
                    </button>
                </div>
            </div>
        );
    }

    // Função que calcula o preço total baseado nos dias e aplica um desconto progressivo
    const calcularPrecoTotal = () => {
        if (!brinquedo.precoAluguel) return 0;

        let precoBase = brinquedo.precoAluguel * diasSelecionados;

        // Descontos opcionais para períodos longos (ajuste as porcentagens se quiser)
        if (diasSelecionados === 7) precoBase = precoBase * 0.90;  // 10% de desconto
        if (diasSelecionados === 15) precoBase = precoBase * 0.80; // 20% de desconto
        if (diasSelecionados === 30) precoBase = precoBase * 0.70; // 30% de desconto

        return precoBase;
    };

    return (
        <div className="detalhe-container">
            <header className="navbar">
                <div className="logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
                    ✨ Caixa Mágica
                </div>
                <nav className="nav-links">
                    <span onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>Início</span>
                    <span onClick={() => navigate('/brinquedos')} style={{ cursor: 'pointer' }}>Brinquedos</span>
                </nav>
            </header>

            <main className="detalhe-main">
                <button className="btn-voltar-link" onClick={() => navigate(-1)}>
                    ← Voltar para a tela anterior
                </button>

                <div className="detalhe-grid">
                    <div className="detalhe-imagem-box">
                        <img
                            src={brinquedo.imagemUrl}
                            alt={brinquedo.nome}
                            className="detalhe-foto"
                            onError={(e) => { e.target.src = 'https://via.placeholder.com/500x400?text=Caixa+Mágica'; }}
                        />
                    </div>

                    <div className="detalhe-info-box">
                        <span className="detalhe-categoria">{brinquedo.categoria || 'Diversão'}</span>
                        <h1>{brinquedo.nome}</h1>

                        <p className="detalhe-descricao">
                            {brinquedo.descricao || 'Brinquedo higienizado, seguro e perfeito para garantir a animação da sua festa.'}
                        </p>

                        <div className="detalhe-especificacoes">
                            <div className="especificacao-item">
                                <strong>Idade Recomendada:</strong> {brinquedo.idade || 'Qualquer idade'}
                            </div>
                        </div>

                        {/* SELETOR DE PERÍODO DE LOCAÇÃO */}
                        <div className="periodo-locacao-box">
                            <label className="seletor-label">Selecione o período de aluguel:</label>
                            <div className="periodos-opcoes">
                                <button
                                    className={`btn-opcao ${diasSelecionados === 1 ? 'ativo' : ''}`}
                                    onClick={() => setDiasSelecionados(1)}
                                >
                                    Diária (Festa)
                                </button>
                                <button
                                    className={`btn-opcao ${diasSelecionados === 7 ? 'ativo' : ''}`}
                                    onClick={() => setDiasSelecionados(7)}
                                >
                                    7 Dias
                                </button>
                                <button
                                    className={`btn-opcao ${diasSelecionados === 15 ? 'ativo' : ''}`}
                                    onClick={() => setDiasSelecionados(15)}
                                >
                                    15 Dias
                                </button>
                                <button
                                    className={`btn-opcao ${diasSelecionados === 30 ? 'ativo' : ''}`}
                                    onClick={() => setDiasSelecionados(30)}
                                >
                                    1 Mês
                                </button>
                            </div>
                        </div>

                        {/* PREÇO DINÂMICO RECALCULADO NA HORA */}
                        {brinquedo.precoAluguel && (
                            <div className="detalhe-preco-box">
                                <span className="preco-label">Valor Total Estimado ({diasSelecionados} {diasSelecionados === 1 ? 'dia' : 'dias'}):</span>
                                <span className="preco-valor">R$ {calcularPrecoTotal().toFixed(2)}</span>
                                <small className="preco-diaria-base">Preço base: R$ {brinquedo.precoAluguel.toFixed(2)}/diária</small>
                            </div>
                        )}

                        <button className="btn-confirmar-aluguel" onClick={() => alert(`Reserva iniciada para ${diasSelecionados} dias!`)}>
                            Reservar Agora
                        </button>
                    </div>
                </div>
            </main>

            <footer className="footer">
                <p>&copy; 2026 Caixa Mágica Locações - Diversão e Alegria Reservados.</p>
            </footer>
        </div>
    );
}