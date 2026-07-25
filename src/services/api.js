// src/services/api.js
const BASE_URL = "http://localhost:8000/api/v1";

const json = async (res) => {
  if (!res.ok) {
    let errorDetail;
    try {
      errorDetail = await res.json();
    } catch (e) {
      errorDetail = await res.text();
    }
    console.error("DETALHE EXATO DO ERRO DO DJANGO:", JSON.stringify(errorDetail, null, 2));
    throw new Error(`Erro ${res.status}`);
  }
  return res.status === 204 ? null : res.json();
};

// ── Brinquedos ───────────────────────────────────────────────────
export async function getBrinquedos(params = {}) {
  const query = new URLSearchParams(params).toString();
  const url = query ? `${BASE_URL}/brinquedos/?${query}` : `${BASE_URL}/brinquedos/`;
  return json(await fetch(url));
}

export async function getBrinquedoById(id) {
  return json(await fetch(`${BASE_URL}/brinquedos/${id}/`));
}

export async function criarBrinquedo(payload) {
  return json(await fetch(`${BASE_URL}/brinquedos/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  }));
}

export async function editarBrinquedo(id, payload) {
  return json(await fetch(`${BASE_URL}/brinquedos/${id}/`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  }));
}

export async function deletarBrinquedo(id) {
  return json(await fetch(`${BASE_URL}/brinquedos/${id}/`, { method: "DELETE" }));
}

// ── Categorias ───────────────────────────────────────────────────
export async function getCategorias() {
  return json(await fetch(`${BASE_URL}/categorias/`));
}

export async function criarCategoria(payload) {
  return json(await fetch(`${BASE_URL}/categorias/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  }));
}

export async function editarCategoria(id, payload) {
  return json(await fetch(`${BASE_URL}/categorias/${id}/`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  }));
}

export async function deletarCategoria(id) {
  return json(await fetch(`${BASE_URL}/categorias/${id}/`, { method: "DELETE" }));
}

// ── Pedidos ──────────────────────────────────────────────────────
export async function getPedidos() {
  return json(await fetch(`${BASE_URL}/pedidos/`));
}

export async function criarPedido(payload) {
  const usuarioSalvo = localStorage.getItem("caixa_magica_user");
  let token = null;

  if (usuarioSalvo) {
    try {
      const userObj = JSON.parse(usuarioSalvo);
      token = userObj.token || userObj.access || userObj?.tokens?.access || userObj?.tokens?.token || null;
    } catch (e) {
      console.error("Erro ao ler dados do usuário do localStorage", e);
    }
  }

  console.log("TOKEN QUE SERÁ ENVIADO:", token);

  const headers = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  console.log("HEADERS FINAIS DA REQUISIÇÃO:", headers);
  console.log("PAYLOAD ENVIADO NO PEDIDO:", payload);

  const res = await fetch(`${BASE_URL}/pedidos/`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(payload),
  });

  return json(res);
}

export async function editarPedido(id, payload) {
  return json(await fetch(`${BASE_URL}/pedidos/${id}/`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  }));
}