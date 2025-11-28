# Previsao do Tempo (Expo)

Aplicativo React Native/Expo que consulta clima atual e previsao dos proximos 5 dias para cidades brasileiras usando a API do OpenWeatherMap.

## Funcionalidades
- Dropdown com cidades brasileiras e busca manual (usa sufixo `,BR` para desambiguar).
- Cartao com temperatura, sensacao termica, umidade, vento, descricao em pt-br e icones customizados.
- Previsao estendida: resumo diario para 5 dias (min/max) com icone do periodo das 12h.
- Visual moderno com gradientes e icones do pacote Ionicons.

## Requisitos
- Node.js 18+ e npm.
- Conta no OpenWeatherMap para gerar a `API_KEY`.
- Expo Go opcional para testar em aparelho fisico.

## Passo a passo para rodar
1. Clone/baixe este repositorio e abra no terminal.
2. Instale as dependencias: `npm install`.
3. Crie o arquivo `.env` na raiz com a sua chave do OpenWeatherMap:
   ```
   API_KEY=sua_chave_do_openweathermap
   ```
4. Inicie o servidor do Expo: `npm run start` (abre o DevTools no navegador).
5. Escolha onde abrir o app:
   - Dispositivo fisico: abra o Expo Go e escaneie o QR code exibido.
   - Emulador: `npm run android` ou `npm run ios` (SDKs configurados).
   - Navegador: `npm run web`.
6. Se nada aparecer, confira se a `API_KEY` esta valida e se a cidade digitada inclui `,BR` quando necessario.

## Variaveis de ambiente
- `.env`: define `API_KEY`.
- `app.config.js`: injeta a chave em `expo.extra.apiKey`, lida por `src/services/weatherService.js`.
- A chave precisa permitir os endpoints `/data/2.5/weather` e `/data/2.5/forecast`.

## Scripts npm
- `npm run start` - inicia servidor Metro/Expo.
- `npm run android` - builda e executa no emulador/aparelho Android.
- `npm run ios` - builda e executa no simulador iOS.
- `npm run web` - abre a versao web no navegador.

## Estrutura resumida
- `App.js`: carrega `HomeScreen`.
- `src/screens/HomeScreen.js`: dropdown, estados de erro/carregamento e disparo de `buscarClima`/`buscarPrevisao5Dias`.
- `src/components/WeatherResult.js`: card com clima atual, umidade, vento e previsao horizontal de 5 dias com icones.
- `src/services/weatherService.js`: chamadas `fetch` com `lang=pt_br` e `units=metric`, agrupando a previsao por dia.
- `src/styles/*.js`: estilos da tela principal e do card de resultado.

## Fluxo principal
- Usuario seleciona/digita a cidade -> `HomeScreen` salva o valor e chama o servico.
- Servicos retornam JSON ou mensagem de erro amigavel; em erro o card e limpo e a mensagem aparece na tela.
- Com sucesso, `WeatherResult` renderiza o card atual e a lista de proximos 5 dias; icones sao escolhidos pelo codigo `weather.icon`.

## Dicas e observacoes
- A lista inicial contem cidades brasileiras, mas voce pode digitar qualquer outra; adicionar `,BR` ajuda a evitar cidades homonimas de outros paises.
- Respostas ja chegam em unidades metricas e pt-br, sem conversao adicional.
- Licenca 0BSD conforme `package.json`.
