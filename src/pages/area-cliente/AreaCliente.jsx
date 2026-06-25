import React, { useState } from 'react';
import './AreaCliente.css';

const AreaCliente = () => {
    const [pedidos] = useState([
        {
            id: 1,
            nome: "Bebê Conforto Touring (Copacabana cinza)",
            status: "Em Uso",
            diasRestantes: 5,
            prazoTotal: 15
        },
        {
            id: 2,
            nome: "Piscina de Bolinhas Colorida",
            status: "Em Uso",
            diasRestantes: 1,
            prazoTotal: 7
        }
    ]);

    return (
        <div className="page-wrapper">
            <div className="dashboard-container">

                <header className="welcome-header">
                    <h2>Olá, Adriele! 👋</h2>
                    <p>Seja bem-vinda de volta ao seu painel da Caixa Mágica.</p>
                </header>

                <section className="bloco-alugueis">
                    <h3 className="secao-titulo">Aluguéis Ativos</h3>

                    <div className="alugueis-grid">
                        {pedidos.map(item => (
                            <div key={item.id} className="item-alugado-card">
                                {/* Espaço reservado para a imagem do brinquedo */}
                                <div className="item-image-placeholder">
                                    <span>[Foto do Brinquedo]</span>
                                </div>

                                <div className="item-info">
                                    <span className="status-badge">{item.status}</span>
                                    <h4>{item.nome}</h4>
                                    <p className="prazo-texto">
                                        Restam <strong>{item.diasRestantes}</strong> de {item.prazoTotal} dias
                                    </p>
                                </div>

                                <div className="acoes-container">
                                    <button className="btn-acao btn-renovar">Renovar</button>
                                    <button className="btn-acao btn-devolucao">Devolver</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <footer className="dashboard-footer">
                    <p>Precisa de suporte com as suas entregas ou coletas? Entre em contato via WhatsApp: <strong>(79) 99811-2997</strong></p>
                </footer>

            </div>
        </div>
    );
};

export default AreaCliente;