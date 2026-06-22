// src/pages/area-cliente/AluguelCard.jsx
import React from 'react';

const AluguelCard = ({ produto, status }) => {
    return (
        <div className="aluguel-card">
            <h4>{produto}</h4>
            <p>Status: <strong>{status}</strong></p>
            <button>Ver detalhes</button>
        </div>
    );
};

export default AluguelCard;