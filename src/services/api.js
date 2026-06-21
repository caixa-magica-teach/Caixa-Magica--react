// src/services/api.js
const BASE_URL = "http://localhost:8000/api/v1";

// ── Brinquedos ───────────────────────────────────────────────────
export async function getBrinquedos(params = {}) {
  const query = new URLSearchParams(params).toString();
  const url   = query ? `${BASE_URL}/brinquedos/?${query}` : `${BASE_URL}/brinquedos/`;
  const res   = await fetch(url);
  if (!res.ok) throw new Error("Erro ao buscar brinquedos");
  return res.json();
}

export async function getBrinquedoById(id) {
  const res = await fetch(`${BASE_URL}/brinquedos/${id}/`);
  if (!res.ok) throw new Error("Brinquedo não encontrado");
  return res.json();
}

// ── Categorias ───────────────────────────────────────────────────
export async function getCategorias() {
  const res = await fetch(`${BASE_URL}/categorias/`);
  if (!res.ok) throw new Error("Erro ao buscar categorias");
  return res.json();
}

// ── Pedidos ──────────────────────────────────────────────────────
// Cria um novo pedido
// payload: { prazo_aluguel, tipo_logistica, endereco_entrega, valor_total, itens: [{brinquedo, preco_no_momento}] }
export async function criarPedido(payload) {
  const res = await fetch(`${BASE_URL}/pedidos/`, {
    method:  "POST",
    headers: { "Content-Type": "application/json" },
    body:    JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Erro ao criar pedido");
  return res.json();
}
