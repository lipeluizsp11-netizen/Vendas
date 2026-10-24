# Vendas — catálogo digital

Aplicativo estático responsivo, sem dependências ou etapa de build.

## Recursos
- Busca por nome ou código e filtros de categoria.
- Carrinho com quantidades, remoção, total e persistência local.
- Dados do cliente e observações para compor a lista.
- Copiar lista de compras.
- Envio pelo WhatsApp **desativado**, conforme solicitado.

Produtos, preços e ilustrações são demonstrativos. Não há integração com ERP, pagamento ou registro central de pedidos.

## Publicar no Netlify
1. No Netlify, importe este repositório pelo GitHub.
2. Selecione a branch main.
3. Deixe Build command vazio e Publish directory como ponto (.).
4. Publique. O arquivo netlify.toml já declara o diretório de publicação.

## Editar
Produtos e valores ficam em app.js; aparência em styles.css; textos da página em index.html.

## WhatsApp
O envio permanece desativado em config.js. Para habilitar futuramente, defina whatsappEnabled como true e informe sellerWhatsApp com código do país e DDD, somente dígitos.
Não há configuração do vendedor no navegador dos clientes.

## Executar localmente
Sirva a pasta com qualquer servidor estático, por exemplo:
python3 -m http.server 8080

Abra http://localhost:8080. Também é possível abrir index.html diretamente; a cópia pode depender das permissões do navegador.

## Limites
O carrinho é salvo apenas no navegador atual. Dados pessoais do formulário não são persistidos. Não há backend, autenticação nem faturamento automático.
