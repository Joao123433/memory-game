# Jogo da Memória
Este é um jogo da memória desenvolvido em HTML, CSS e Typescript. O jogo é composto por cartas que têm pares correspondentes. O objetivo é encontrar todos os pares de cartas, fazendo o menor número possível de movimentos, o código possui retorno visual se as cartas forem iguais ou diferentes, ao ganhar é mostrado um top 3 de melhores desempenho.

## Link para o Projeto
https://joao123433.github.io/memory-game/

## Como Jogar
1. Ao clicar em uma carta, ela será virada para revelar seu conteúdo.
2. Clique em outra carta para tentar encontrar o par correspondente.
3. Se as duas cartas coincidirem, elas permanecerão viradas.
4. Se as cartas não coincidirem, elas serão viradas novamente após um breve intervalo.

# Estrutura do Código
## Elementos HTML
- `#section-cards:` Contêiner principal para as cartas do jogo.
- `#timer:` Exibe o tempo decorrido durante o jogo.
- `#moves:` Exibe o número de movimentos realizados.
- `#repeat:` Botão para reiniciar o jogo.
- `#win:` Elemento que aparece quando o jogador vence o jogo.
- `#game-over:` Elemento que aparece quando o jogo termina sem sucesso.
- `#play-again:` Botões para jogar novamente após vencer ou perder.
- `#win-timer:` Exibe o tempo decorrido ao vencer.
- `#win-moves:` Exibe o número de movimentos ao vencer.
- `#top3:` Lista de elementos que exibem os três melhores desempenhos.

## Classes e Variáveis
- `classes:` Array de classes CSS utilizadas para animações.
- `btnCards:` Lista dos elementos HTML button.
- `cardsRandom:` Lista de cartas embaralhadas.
- `compareCards:` Lista de cartas comparadas para verificar se são iguais ou diferentes.
- `moves:` Número de movimentos realizados.
- `meuInterval:` Interval que controla o timer.

## Funções Principais
- `fetchCards:` Função assíncrona para obter as cartas do servidor.
- `createDiv e createBtn:` Funções auxiliares para criar elementos HTML.
- `renderCards:` Renderiza as cartas na tela.
- `getCards:` Obtém as cartas, as embaralha e as renderiza.
- `cardOpen:` Lida com o evento de clicar em uma carta.
- `removeClick e addClick:` Removem ou adicionam eventos de clique às cartas.
- `setMoves:` Atualiza o número de movimentos e inicia o temporizador.
- `starTimer:` Inicia o temporizador do jogo.
- `gameOver e win:` Exibem os elementos de fim de jogo.
- `top3:` Exibe os três melhores desempenhos.
- `saveLocalStorage:` Salva o desempenho do jogador no armazenamento local.
- `renderInfoWin:` Renderiza informações na tela ao vencer.
- `removeBackground e addBackground:` Removem ou adicionam o plano de fundo padrão das cartas.
- `changeImg:` Altera a imagem da carta.
- `removeAllClasses e addClasses:` Remove ou adiciona classes CSS às cartas.
- `removeCardArray:` Se duas cartas forem iguais remove elas da lista de cartas.
- `matchingCards e differentCards:` Lógica para cartas coincidentes ou diferentes.
- `restart e playAgain:` Reiniciam o jogo.