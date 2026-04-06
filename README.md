# Open House K&A

Site estatico criado para celebrar o novo lar do casal Kaique e Aline, reunindo em um so lugar o convite do evento, a historia do casal, a confirmacao de presenca, a lista de presentes e o envio de mensagens.

O projeto nasce com uma proposta simples: transformar um convite tradicional em uma experiencia digital mais acolhedora, pratica e personalizada. Em vez de depender de varios links soltos ou mensagens separadas, o site centraliza tudo o que os convidados precisam para participar do momento e interagir com o casal.



## Visao geral

O site foi desenvolvido como uma aplicacao front-end leve, sem framework e sem etapa de build. Toda a experiencia roda diretamente no navegador usando HTML, CSS e JavaScript puro.

Ele e dividido em duas paginas principais:

- `index.html`: pagina principal do evento.
- `presentes.html`: pagina dedicada as opcoes de presentes.

## Objetivo do site

O principal objetivo do projeto e oferecer uma pagina elegante e facil de usar para:

- apresentar o evento de open house;
- contar um pouco da historia do casal;
- mostrar endereco e contexto do encontro;
- permitir a confirmacao de presenca;
- receber mensagens dos convidados;
- organizar a lista de presentes;
- oferecer alternativa de presente via PIX.

## Estrutura do projeto

```text
OpenHouse/
|-- images/
|   |-- Cozinha.jpg
|   |-- nossa-foto.jpeg
|   |-- QRcode Pix.jpeg
|   `-- Sala de estar.jpg
|-- index.html
|-- presentes.html
|-- script.js
|-- presentes.js
|-- style.css
`-- README.md
```

### Papel de cada arquivo

- `index.html`: estrutura da pagina inicial, com hero, historia, lista de presentes, endereco, formulario de mensagens e modal de RSVP.
- `presentes.html`: pagina com lista da Amazon, opcao de PIX, referencias visuais de decoracao e modal para confirmar presente.
- `script.js`: controla menu mobile, modal de confirmacao de presenca, animacoes de entrada, estado do formulario de mensagem e contagem regressiva.
- `presentes.js`: controla menu mobile, exibicao do PIX, copia da chave PIX, carregamento dinamico dos presentes e confirmacao de item presenteado.
- `style.css`: concentra toda a identidade visual, responsividade, tipografia, componentes, modal e animacoes.
- `images/`: armazena as imagens usadas no site, incluindo foto do casal, QR Code PIX e referencias de decoracao.

## Ferramentas e tecnologias utilizadas

### HTML5

Usado para estruturar o conteudo do site de forma semantica e direta.

Por que foi utilizado:

- permite um projeto simples e facil de manter;
- funciona muito bem em sites institucionais e landing pages;
- facilita a publicacao em hospedagens estaticas como GitHub Pages.

### CSS3

Responsavel pelo visual completo do projeto.

Por que foi utilizado:

- define a identidade visual elegante e minimalista do site;
- organiza layout responsivo para desktop e mobile;
- cria animacoes suaves, modal, cards, menu e elementos decorativos.

### JavaScript Vanilla

Usado para toda a parte interativa do projeto, sem dependencia de frameworks.

Por que foi utilizado:

- mantem o projeto leve e rapido;
- reduz complexidade para um site de escopo enxuto;
- resolve bem interacoes como modais, envio de dados, menu mobile e carregamento da lista de presentes.

### Google Fonts

Fontes carregadas externamente:

- `Cormorant Garamond`
- `Manrope`

Por que foram utilizadas:

- reforcam um visual sofisticado e acolhedor;
- ajudam a diferenciar titulos e textos corridos;
- elevam a percepcao de cuidado estetico da pagina.

## APIs, integracoes e servicos externos

O projeto nao possui backend proprio. Em vez disso, ele usa servicos externos para lidar com envio de dados e automacoes.

### 1. Google Apps Script Web App

Endpoint configurado nos formularios de RSVP e confirmacao de presentes:

- usado em `index.html` no formulario `#rsvp-form`;
- usado em `presentes.html` no formulario `#gift-form`.

Funcoes que esse endpoint atende:

- `action=rsvp`: registra resposta de presenca do convidado;
- `action=list`: retorna a lista de presentes ainda disponiveis;
- `action=confirm`: confirma que um presente foi escolhido por alguem.

Por que foi utilizado:

- funciona como backend leve sem precisar subir servidor;
- integra facilmente com Google Sheets;
- simplifica o controle de presenca e de presentes confirmados.

### 2. FormSubmit

Usado no formulario de mensagens da pagina principal.

Funcao:

- envia por e-mail a mensagem preenchida pelo convidado;
- encaminha a mensagem para o e-mail principal e para o e-mail em copia.

Por que foi utilizado:

- evita a necessidade de backend proprio para envio de e-mail;
- e simples de integrar com formularios HTML;
- atende bem ao caso de uso de mensagens ocasionais.

### 3. Amazon Wishlist

Link externo para a lista de desejos na Amazon.

Funcao:

- permite que o convidado escolha itens prontos para comprar;
- facilita a curadoria de produtos desejados pelo casal.

Por que foi utilizado:

- aproveita a estrutura pronta da Amazon;
- reduz esforco de manter um catalogo proprio no site;
- oferece praticidade ao convidado.

## Funcionalidades do site

### Pagina principal

- menu de navegacao com links ancora;
- secao inicial com identidade do evento;
- botao para abrir modal de confirmacao de presenca;
- secao contando a historia do casal;
- acesso a pagina de presentes;
- secao com endereco do evento;
- formulario para envio de mensagens;
- animacoes de entrada nos elementos ao rolar a pagina.

### Confirmacao de presenca

No modal de RSVP, o convidado informa o nome e escolhe uma das respostas:

- confirmar presenca;
- informar que nao ira, mas ainda pretende presentear.

Apos isso, o site envia os dados para o endpoint do Google Apps Script usando `fetch` com `POST`.

### Pagina de presentes

- botao para abrir a lista da Amazon;
- botao para confirmar que um presente ja foi comprado;
- botao para exibir a chave PIX e o QR Code;
- botao para copiar a chave PIX;
- referencias visuais de cores e decoracao da casa.

### Confirmacao de presente

Quando o modal e aberto:

- o site consulta o Google Apps Script com `action=list`;
- carrega dinamicamente os presentes disponiveis em um `<select>`;
- o convidado informa o nome e escolhe o item;
- o site envia a confirmacao com `action=confirm`.

Isso ajuda a evitar duplicidade de presentes e mantem a lista mais organizada.

### Envio de mensagens

Na secao de mensagens:

- o convidado preenche nome, e-mail e mensagem;
- o formulario envia os dados via FormSubmit;
- apos o redirecionamento, o site mostra uma mensagem de sucesso.

## Como o site funciona na pratica

### Fluxo do convidado

1. O convidado acessa a pagina principal.
2. Le a proposta do evento e conhece um pouco da historia do casal.
3. Pode confirmar presenca pelo modal.
4. Pode acessar a pagina de presentes.
5. Nessa pagina, pode escolher comprar via Amazon ou enviar PIX.
6. Se ja comprou algo, pode registrar o presente no modal.
7. Tambem pode deixar uma mensagem para o casal.

### Fluxo tecnico

1. O HTML renderiza a estrutura da pagina.
2. O CSS aplica identidade visual, layout e responsividade.
3. O JavaScript adiciona comportamento interativo.
4. O navegador se comunica com servicos externos para salvar ou enviar dados.

## APIs nativas do navegador utilizadas

Alem dos servicos externos, o projeto tambem usa APIs do proprio navegador:

- `fetch`: para enviar e buscar dados do Google Apps Script.
- `URLSearchParams`: para montar os payloads enviados aos endpoints.
- `navigator.clipboard`: para copiar a chave PIX.
- `IntersectionObserver`: para revelar elementos com animacao ao entrar na area visivel.
- `setInterval`: para atualizar a contagem regressiva quando ela estiver habilitada.

## Design e identidade visual

O site segue uma direcao visual minimalista, leve e acolhedora.

Caracteristicas percebidas no projeto:

- paleta neutra e elegante;
- tipografia serifada para titulos e sans-serif para leitura;
- elementos arredondados e suaves;
- uso de imagens reais e referencias visuais de decoracao;
- foco em uma navegacao simples e emocionalmente agradavel.

Essa escolha estetica combina com a proposta do open house, pois transmite intimidade, cuidado e personalidade.

## Responsividade

O projeto possui adaptacao para telas menores com:

- menu hamburguer;
- reorganizacao de grids em coluna unica;
- ajuste de espacamentos;
- cards e galerias adaptados para mobile.

Isso torna o site acessivel tanto em celular quanto em desktop.

## Como executar o projeto

Como o projeto e estatico, existem duas formas simples de uso:

### Opcao 1: abrir diretamente no navegador

Basta abrir o arquivo `index.html`.

### Opcao 2: servir localmente com um servidor estatico

Exemplo com Python:

```bash
python -m http.server 8000
```

Depois acesse:

```text
http://localhost:8000
```

## Como utilizar o site

### Para convidados

- acessar a pagina inicial;
- ler as informacoes do evento;
- confirmar presenca;
- consultar a lista de presentes;
- escolher presentear via Amazon ou PIX;
- deixar uma mensagem ao casal.

### Para quem administra o projeto

- editar os textos diretamente nos arquivos HTML;
- trocar imagens dentro da pasta `images/`;
- alterar estilos no `style.css`;
- ajustar comportamentos no `script.js` e `presentes.js`;
- atualizar links e endpoints externos quando necessario.

## Pontos de configuracao importantes

Atualmente algumas informacoes estao fixas no codigo e podem ser personalizadas facilmente:

- nome e identidade do casal;
- textos da home e da historia;
- endereco do evento;
- link da lista da Amazon;
- chave PIX;
- QR Code PIX;
- e-mails usados no FormSubmit;
- endpoint do Google Apps Script;
- URL de redirecionamento apos envio da mensagem.

## Observacoes tecnicas relevantes

### Contagem regressiva

Existe uma contagem regressiva implementada em `script.js`, mas no HTML ela esta marcada com `data-mode="coming-soon"`, o que impede a atualizacao automatica no momento.

Na pratica, isso significa que:

- a estrutura do contador ja existe;
- a data alvo esta definida no JavaScript;
- o comportamento esta temporariamente desativado pela configuracao atual da pagina.

### Arquitetura simples e de facil manutencao

O projeto foi construido de forma intencionalmente simples.

Beneficios disso:

- facil de editar;
- baixo custo de hospedagem;
- boa performance;
- pouca dependencia externa;
- manutencao acessivel mesmo sem framework.

## Possiveis melhorias futuras

- painel administrativo para gerenciar confirmacoes e presentes;
- persistencia propria com backend dedicado;
- integracao com mapa para localizacao do evento;
- galeria de fotos adicional;
- confirmacao com numero de acompanhantes;
- pagina de agradecimento mais personalizada;
- protecao extra contra spam nos formularios;
- feedback visual mais avancado para estados de carregamento e erro.

## Resumo do projeto

O Open House K&A e um site-convite digital com foco em experiencia, praticidade e organizacao. Ele combina uma apresentacao afetiva do momento do casal com funcionalidades uteis para convidados, como RSVP, mensagens, lista de presentes e PIX.

Mesmo sendo um projeto leve e sem backend proprio, ele entrega uma experiencia completa por meio da integracao com servicos externos e de uma interface bem pensada para o contexto do evento.
