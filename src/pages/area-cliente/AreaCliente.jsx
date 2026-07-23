import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AreaCliente.css';

const AreaCliente = () => {
    const navigate = useNavigate();
    const [abaAtiva, setAbaAtiva] = useState('ativos');

    const [pedidosAtivos] = useState([
        {
            id: 1,
            nome: "Bebê Conforto Touring (Copacabana cinza)",
            status: "Em Uso",
            diasRestantes: 5,
            prazoTotal: 15,
            imagem: "🚗"
        },
        {
            id: 2,
            nome: "Piscina de Bolinhas Colorida",
            status: "Urgente",
            diasRestantes: 1,
            prazoTotal: 7,
            imagem: "🎨"
        }
    ]);

    const [historicoPedidos] = useState([
        {
            id: 3,
            nome: "Andador Musical Fisher-Price",
            status: "Concluído",
            dataDevolucao: "10/05/2026",
            imagem: "🧸"
        }
    ]);

    const handleRenovar = (nome) => {
        alert(`Solicitação de renovação enviada para: ${nome}`);
    };

    const handleDevolver = (nome) => {
        alert(`Agendamento de devolução/coleta iniciado para: ${nome}`);
    };

    return (
        <div className="page-wrapper">
            <div className="dashboard-container">

                <header className="welcome-header">
                    <h2>Olá, Cliente! 👋</h2>
                    <p>Seja bem-vindo de volta ao seu painel Caixa Mágica.</p>
                </header>

                {/* Menu de Abas Internas e Botão de Catálogo Lado a Lado */}
                <div className="dashboard-topo-wrapper">
                    <div className="dashboard-tabs">
                        <button
                            className={`tab-btn ${abaAtiva === 'ativos' ? 'active' : ''}`}
                            onClick={() => setAbaAtiva('ativos')}
                        >
                            Aluguéis Ativos ({pedidosAtivos.length})
                        </button>
                        <button
                            className={`tab-btn ${abaAtiva === 'historico' ? 'active' : ''}`}
                            onClick={() => setAbaAtiva('historico')}
                        >
                            Histórico de Aluguéis
                        </button>
                    </div>

                    <button
                        className="btn-catalogo-topo"
                        onClick={() => navigate('/catalogo')}
                    >
                        🧸 Ver Catálogo
                    </button>
                </div>

                {/* Conteúdo da Aba: Ativos */}
                {abaAtiva === 'ativos' && (
                    <section className="bloco-alugueis">
                        <h3 className="secao-titulo">Brinquedos com você agora</h3>

                        {pedidosAtivos.length === 0 ? (
                            <p className="empty-text">Você não possui nenhum aluguel ativo no momento. Que tal dar uma olhada na vitrine?</p>
                        ) : (
                            <div className="alugueis-grid">
                                {pedidosAtivos.map(item => (
                                    <div
                                        key={item.id}
                                        className={`item-alugado-card ${item.diasRestantes <= 2 ? 'card-alerta' : ''}`}
                                    >
                                        <div className="item-image-placeholder">
                                            <span role="img" aria-label="brinquedo" style={{ fontSize: '2rem' }}>{item.imagem}</span>
                                        </div>

                                        <div className="item-info">
                                            <span className={`status-badge ${item.diasRestantes <= 2 ? 'badge-urgente' : ''}`}>
                                                {item.diasRestantes <= 2 ? 'Vence Logo!' : item.status}
                                            </span>
                                            <h4>{item.nome}</h4>
                                            <p className="prazo-texto">
                                                Restam <strong>{item.diasRestantes}</strong> de {item.prazoTotal} dias
                                            </p>
                                        </div>

                                        <div className="acoes-container">
                                            <button
                                                className="btn-acao btn-renovar"
                                                onClick={() => handleRenovar(item.nome)}
                                            >
                                                Renovar
                                            </button>
                                            <button
                                                className="btn-acao btn-devolucao"
                                                onClick={() => handleDevolver(item.nome)}
                                            >
                                                Devolver
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </section>
                )}

                {/* Conteúdo da Aba: Histórico */}
                {abaAtiva === 'historico' && (
                    <section className="bloco-alugueis">
                        <h3 className="secao-titulo">Aluguéis anteriores</h3>
                        <div className="alugueis-grid">
                            {historicoPedidos.map(item => (
                                <div key={item.id} className="item-alugado-card historico-card">
                                    <div className="item-image-placeholder">
                                        <span role="img" aria-label="brinquedo" style={{ fontSize: '2rem' }}>{item.imagem}</span>
                                    </div>
                                    <div className="item-info">
                                        <span className="status-badge concluido">Concluído</span>
                                        <h4>{item.nome}</h4>
                                        <p className="prazo-texto">Devolvido em: {item.dataDevolucao}</p>
                                    </div>
                                    <div className="acoes-container">
                                        <button className="btn-acao btn-renovar" onClick={() => navigate('/catalogo')}>Alugar de Novo</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                <footer className="dashboard-footer">
                    <p>Precisa de suporte com as suas entregas ou coletas? Entre em contato via WhatsApp: <strong>(79) 99811-2997</strong></p>
                </footer>

            </div>
        </div>
    );
};

export default AreaCliente;