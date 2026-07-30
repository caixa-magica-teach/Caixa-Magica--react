Caixa Mágica — Frontend

Plataforma de aluguel de brinquedos infantis. Este repositório contém o frontend da aplicação, desenvolvido em React + Vite e integrado com a API REST Django.

Tecnologias

Frontend: React 19 + Vite (bundler), React Router DOM 6 (roteamento SPA), CSS Modules com variáveis globais (estilização), Context API nativa (AuthContext e CartContext), Fetch API nativo centralizado no api.js (sem axios).


 Instalação e execução
Pré-requisitos
Node.js 18+
API Django rodando em http://localhost:8000
Passo a passo
bash


Páginas e rotas
Rota	Página	Acesso
/	Home	Público
/catalogo	Catálogo	Público
/produto/:id	Detalhe do produto	Público
/login	Login / Cadastro	Público
/carrinho	Carrinho	Autenticado
/area-cliente	Área do cliente	Autenticado
/admin	Painel admin	Admin

Funcionalidades
Home — Banner carrossel, categorias em carrossel, produtos novos e mais alugados, todos conectados à API
Catálogo — Filtros por categoria, faixa etária, fase do desenvolvimento, tipo de uso, disponibilidade, prazo e valor; ordenação e busca em tempo real
Navbar — Prévia de busca com debounce, badge de itens no carrinho, navegação protegida
Produto — Carrossel de imagens com miniaturas, seletor de período (diária, 7, 15 e 30 dias) com desconto automático
Carrinho — Itens persistidos no localStorage, seleção de logística (retirada/entrega) e confirmação de pedido
Autenticação — Login e cadastro com JWT, AuthContext global, proteção de rotas e logout
Painel Admin — Login protegido, dashboard com estatísticas, CRUD de produtos com gerenciador de imagens, CRUD de categorias e gerenciamento de pedidos

Scripts disponíveis

npm run dev      # Inicia o servidor de desenvolvimento
npm run build    # Gera o build de produção na pasta /dist
npm run preview  # Visualiza o build de produção localmente
