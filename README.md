# Hunter Engenharia e Projetos — Site

Site institucional reformatado. HTML, CSS e JavaScript puros — sem build, sem framework, sem dependência de runtime.

## Páginas

| Arquivo | Conteúdo |
|---|---|
| `index.html` | Home: hero, manifesto, diferenciais, frentes de trabalho, processo, vitrine |
| `quem-somos.html` | História, números, pilares e estrutura da empresa |
| `solucoes.html` | As 4 frentes de trabalho, serviços e metodologia |
| `produtos.html` | Catálogo completo dos 47 itens, com busca e filtros |
| `pages/reposicao.html` | Peças de Reposição — 24 itens |
| `pages/laminadora.html` | Laminadora — 13 itens |
| `pages/importado.html` | Importado — 8 itens |
| `pages/agronegocio.html` | Agronegócio — 2 itens |
| `clientes.html` | Setores atendidos e regiões de atendimento |
| `contato.html` | Canais diretos, mapa e formulário técnico |

Cada frente de trabalho tem URL própria (uma aba no menu), o que ajuda no SEO e
deixa o link compartilhável direto para a categoria.

## Arquivos

```
assets/css/main.css    Design system completo
assets/js/data.js      Catálogo: 47 produtos em 4 categorias  ← edite aqui
assets/js/main.js      Interações (filtros, modal, menu, animações)
assets/img/favicon.svg
pages/                 Uma página por frente de trabalho
```

## Como testar localmente

```bash
python -m http.server 8899
# abra http://localhost:8899
```

Precisa de servidor (não funciona abrindo o `.html` direto, porque o `fetch` de imagens e o histórico exigem HTTP).

## Publicar

Suba o conteúdo da raiz para o servidor. Não é preciso configurar nada — é HTML estático.

- **Hostinger / cPanel:** envie os arquivos para `public_html/`
- **GitHub Pages:** commit e publique na branch
- **Servidor próprio:** aponte o document root para esta pasta

## Editar o catálogo

Tudo está em `assets/js/data.js`. Para adicionar um produto:

```js
{
  code: "73024",
  name: "Nome do produto",
  cat: "4",                      // 4=Reposição 6=Laminadora 7=Importado 8=Agronegócio
  file: "nome_do_arquivo_mini.jpeg",   // fica em /admin/arquivos/produtos/
  desc: "Descrição curta.",
  tags: ["Tag1", "Tag2"],
  aplic: "Onde é usado"
}
```

O nome do arquivo deve terminar em `_mini` — o site troca por `_mini` removido para buscar a imagem em alta resolução no modal.

## Imagens

As fotos são carregadas do servidor atual em `hunterprojetos.com.br`. Para migrar tudo local:

1. Baixe as imagens para `assets/img/produtos/`
2. Em `data.js`, troque `IMG_BASE` por `"assets/img/produtos/"`
3. Faça backup dos originais — o `.gitignore` do deploy deve ignorar essa pasta se ela ficar grande

## Ajustes rápidos

| Mudança | Onde |
|---|---|
| Cores | `assets/css/main.css`, bloco `:root` |
| Tema grafite | Tokens no `:root` — superfícies 40% mais escuras (luminância × 0.6) |
| Telefone, e-mail, endereço | Em todas as páginas: rodapé e `contato.html` |
| Itens do menu | Bloco `<nav class="nav">` e `<nav class="drawer-nav">` em cada página |
| Texto de uma frente | `pages/<frente>.html`: `<h1>`, `.lead` e o `.page-hero` |
| Ano do rodapé | Automático via `<span data-year>` |
| Texto do formulário | `contato.html`, bloco `<form data-form>` |

### Paleta atual (tema grafite)

| Token | Valor | Uso |
|---|---|---|
| `--paper` | `#b3b8b5` | Fundo da página |
| `--white` | `#c8cbc9` | Cartões e superfícies elevadas |
| `--green` | `#0b4f30` | Marca, botões, destaques |
| `--green-deep` | `#062516` | Rodapé e seções escuras |
| `--ink` | `#0c1511` | Texto principal (9,2:1 sobre o fundo) |
| `--lime` | `#6d9c14` | Detalhe de destaque |

Contraste conferido: texto principal 9,2:1, secundário 7,8:1, terciário 5,4:1 —
todos acima do mínimo AA da WCAG (4,5:1).

Se criar uma **nova frente de trabalho**, copie um arquivo de `pages/`, ajuste o
`data-force-cat` (id da categoria em `data.js`) e acrescente o item ao menu nas
10 páginas — ou rode `_dev/navfix.ps1`, que reconstrói os menus de uma vez.

O formulário é apenas visual — não envia e-mail. Para conectar, troque o
`preventDefault` em `main.js` (função `form`) por um `fetch` para seu endpoint
ou um `<form action="..." method="post">`.

## Acessibilidade e desempenho

- Respeita `prefers-reduced-motion` (desliga todas as animações)
- Navegação por teclado, `skip link` e rótulos `aria-label` nos botões de ícone
- Contraste verificado em todos os textos, inclusive nas seções escuras
- Imagens com `loading="lazy"` e `alt` descritivo
- 1 fonte, 1 CSS e 2 JS — sem jQuery, sem Bootstrap, sem ícones externos

## Efeitos (todos desligam com `prefers-reduced-motion`)

| Efeito | Onde | Como funciona |
|---|---|---|
| Barra de progresso | `.progress` | Fixa no topo, gradiente verde → lima |
| Brilhos do hero | `.hero::before/::after` | Círculos desfocados que flutuam devagar |
| Revelação de imagem | `data-reveal-img` | Cortina verde que abre quando a imagem entra na tela |
| Parallax | `data-parallax="0.05"` | Deslocamento suave conforme a rolagem |
| Seções escuras | `.section--dark` | Verde profundo, números e etiquetas em lima |
| Sublinhado que varre | `.sweep` | Risca que cresce da direita para a esquerda |
| Voltar ao topo | `[data-to-top]` | Aparece após 700px de rolagem |

## Testes

Em `_dev/` (não precisa subir para o servidor):

```bash
npm install jsdom
node _dev/test.js        # 71 verificações: links, render, filtros, modal, formulário, a11y
pwsh -File _dev/check.ps1  # varre caracteres corrompidos nos textos
```