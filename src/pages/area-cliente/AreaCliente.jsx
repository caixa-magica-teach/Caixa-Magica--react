// src/pages/area-cliente/AreaCliente.jsx
import React from 'react';
import './AreaCliente.css'; // Importando o seu CSS

const AreaCliente = () => {
    return (
        <div className="area-cliente-container">
            <h1>Área do Cliente</h1>

            <div className="perfil-card">
                <h2>Olá, Gabriel!</h2>
                <p>Aqui você acompanha seus aluguéis da Caixa Mágica.</p>
            </div>

            <div className="lista-alugueis">
                <h3>Seus brinquedos atuais</h3>

                {/* Este é o card que você estilizou no seu CSS */}
                <div className="aluguel-card">
                    <div>
                        <h4>Piscina de Bolinhas</h4>
                        <p>Status: <strong>Em uso</strong></p>
                    </div>
                    <button>Ver detalhes</button>
                </div>

                {/* Você pode adicionar outros cards aqui depois */}
            </div>
        </div>
    );
};

export default AreaCliente;