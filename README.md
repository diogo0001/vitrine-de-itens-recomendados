# Vitrine de itens recomendados (API indisponível)

Página web que apresenta os itens recomendados a partir de um item de referência, consumindo dados JSON.

## Features

A página apresenta um header com menu para os links e uma seção com os cards dos produtos.

Os cards direcionam para a página de cada produto.

Possui uma implementação de paginação utilizando carousel para os itens recomendados ao lado do item original.

Implementação compatível com formato mobile e tamanho dinâmico do carousel, de acordo com o tamanho de tela.

Carregamento da lista feito dinamicamente em Javascript com os dados JSON de um [serviçoWeb](http://roberval.chaordicsystems.com/challenge/challenge.json?callback=X), (carregamento feito em JSONP, url carregada dinâmicamente no escopo do arquivo HTML).

A página foi carregada em um servidor remoto e está didponível neste [link](https://vitrine-de-produtos.herokuapp.com). É possivel que o navegador apresente algum warning sobre os scripts da página, basta ir no canto direito da barra de navegação e permitir que a página seja aberta (No Google é no canto direito da borda e no Firefox no canto esquerdo, pedir para ver as informações do site). 

O deploy foi feito com Heroku, uma plataforma que, além de gratuita, facilita implementação pois utiliza o git e seus comandos. 


## Tecnologias e Dependências

Desenvolvido sem Frameworks ou bibliotecas para Frontend, (apenas uma classe via CDN para implementar o menu) 


### Frotend

- Javascript - Elementos dinâmicos da tela e manipulação dos dados
- HTML - Estrutura da página
- CSS - Estilos e posicionamento


### Backend

- [Node.js](https://nodejs.org/en/) - v10.9.0
- [Express](https://expressjs.com/pt-br/) - v6.2.0
- [Npm](https://www.npmjs.com/) - v6.2.0
- [Heroku](https://dashboard.heroku.com/) -7.22.4
