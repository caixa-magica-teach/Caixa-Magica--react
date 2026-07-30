🧸 Caixa Mágica — Frontend

Plataforma de aluguel de brinquedos infantis. Interface web desenvolvida em React + Vite, integrada com a API REST Django da Caixa Mágica.

🚀 Tecnologias

Frontend: React 19.2.6 + Vite 8 (bundler), React Router DOM 7.15.1 (roteamento SPA), Swiper 14 (carrosséis), CSS puro com variáveis globais em global.css (estilização), Context API nativa — AuthContext e CartContext — (estado global), Fetch API nativo centralizado em src/services/api.js (sem axios).

📁 Estrutura de pastas
src/
├── assets/                      # Imagens e arquivos estáticos
│   ├── logo.png
│   ├── fundo.jpg
│   ├── brinquedo1.png
│   ├── brinquedo2.png
│   └── brinquedo3.png
│
├── components/                  # Componentes reutilizáveis
│   ├── Banner.jsx / .css        # Carrossel principal da home
│   ├── Categorias.jsx / .css    # Carrossel de categorias
│   ├── MostRented.jsx / .css    # Seção "Mais Alugados"
│   ├── NewProducts.jsx / .css   # Seção "Acabou de chegar"
│   ├── Navbar.jsx / .css        # Barra de navegação global
│   ├── Rodape.jsx / .css        # Rodapé global
│   ├── Field.jsx                # Campo de formulário reutilizável
│   ├── LoginForm.jsx            # Formulário de login
│   └── RegisterForm.jsx         # Formulário de cadastro
│
├── context/                     # Contextos globais (estado compartilhado)
│   ├── AuthContext.jsx          # Autenticação: user, login(), logout(), logado
│   └── CartContext.jsx          # Carrinho: itens, adicionarItem(), removerItem(), total
│
├── pages/                       # Páginas da aplicação
│   ├── Landing.jsx / .css       # Página inicial (apresentação)
│   ├── Home.jsx / .css          # Home com seções conectadas à API
│   ├── Login.jsx / .css         # Login e cadastro
│   ├── Carrinho.jsx / .css      # Carrinho e confirmação de pedido
│   ├── admin/
│   │   ├── Admin.jsx            # Painel administrativo completo
│   │   └── Admin.css
│   ├── area-cliente/
│   │   ├── AreaCliente.jsx      # Histórico de pedidos e perfil
│   │   ├── AreaCliente.css
│   │   └── AluguelCard.jsx      # Card de pedido individual
│   ├── catalogo/
│   │   ├── Catalogo.jsx         # Catálogo com filtros avançados
│   │   └── Catalogo.css
│   └── product-detail/
│       ├── ProductDetail.jsx    # Detalhe do produto com carrossel
│       └── ProductDetail.css
│
├── services/
│   └── api.js                   # Todas as chamadas à API Django
│
├── App.jsx                      # Rotas e providers globais
├── main.jsx                     # Ponto de entrada da aplicação
├── global.css                   # Variáveis CSS globais (cores, fontes, espaçamentos)
└── index.css                    # Reset CSS base
⚙️ Instalação e execução
Pré-requisitos
Node.js 18+
API Django rodando em http://localhost:8000
Passo a passo
bash

# 1. Clone o repositório
git clone https://github.com/caixa-magica-teach/Caixa-Magica--react.git
cd caixa-magica-frontend/site

# 2. Instale as dependências
npm install

# 3. Inicie o servidor de desenvolvimento
npm run dev

Acesse em http://localhost:5173

🔑 Variáveis de ambiente

A URL da API está definida diretamente em src/services/api.js:

js
const BASE_URL = "http://localhost:8000/api/v1";

Para produção, substitua pelo endereço da API em deploy ou use variável de ambiente:

env
# .env
VITE_API_URL=https://sua-api.com/api/v1
js
// src/services/api.js


const BASE_URL = import.meta.env.VITE_API_URL;
📄 Rotas da aplicação
Rota	Página	Acesso
/	Landing	Público
/home	Home	Público
/catalogo	Catálogo	Público
/produto/:id	Detalhe do produto	Público
/login	Login / Cadastro	Público
/carrinho	Carrinho	Autenticado
/area-cliente	Área do cliente	Autenticado
/admin	Painel admin	Admin

🧩 Funcionalidades

Landing — Página de apresentação com proposta de valor e CTA para a home.

Home — Banner carrossel, categorias em carrossel, seção "Acabou de chegar" com os 3 últimos produtos e seção "Mais Alugados", todos conectados à API.

Navbar — Busca em tempo real com debounce e prévia de resultados, badge com quantidade de itens no carrinho, navegação por React Router.

Catálogo — Sidebar de filtros por categoria, faixa etária, fase do desenvolvimento, tipo de uso, disponibilidade, prazo e faixa de valor; pills de categoria, ordenação (relevância, menor/maior preço, A→Z) e contador de resultados. Lê o parâmetro ?search= da URL.

Produto — Carrossel de imagens com setas, contador e miniaturas clicáveis. Seletor de período (Diária, 7, 15 e 30 dias) com desconto automático. Descrição exibida abaixo da galeria.

Carrinho — Itens adicionados via CartContext, seleção entre retirada e entrega, campo de endereço condicional, cálculo de total e envio do pedido à API com token JWT.

Login / Cadastro — Validação de campos, indicador de força de senha, aceite de termos e opção de login com Google (UI). Após login, salva dados e token no localStorage via AuthContext.

Área do cliente — Exibe pedidos ativos e histórico buscados da API. Logout via AuthContext.

Painel Admin — Protegido por senha local. Dashboard com totais, CRUD de produtos com gerenciador de imagens por URL, CRUD de categorias e gerenciamento de pedidos com filtro por status e atualização direta na tabela.

🌐 Deploy (Vercel)
Suba o repositório para o GitHub
Acesse vercel.com e importe o repositório
Configure:
Framework Preset: Vite
Root Directory: site
Build Command: npm run build
Output Directory: dist
Adicione a variável VITE_API_URL em Settings → Environment Variables
Clique em Deploy
🛠️ Scripts
bash
npm run dev      # Servidor de desenvolvimento
npm run build    # Build de produção (gera /dist)
npm run preview  # Visualiza o build localmente
npm run lint     # Verifica o código com ESLint

🔗 Repositório da API

Backend Django disponível em: github.com/seu-usuario/caixa-magica-api
