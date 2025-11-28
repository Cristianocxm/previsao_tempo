# Previsao do Tempo

Aplicativo React Native construido com Expo que exibe o clima atual de cidades brasileiras usando a API do OpenWeatherMap.

## Como rodar
1. Node.js 18+ e npm instalados.
2. Instale dependencias: `npm install`.
3. Defina a chave do OpenWeatherMap em `.env` na raiz:
   ```
   API_KEY=sua_chave_aqui
   ```
4. Rode: `npm run start` (abre o DevTools do Expo).
5. Para dispositivos: use o Expo Go e escaneie o QR code exibido ou execute `npm run android` / `npm run ios` (se tiver SDKs configurados). Para navegador: `npm run web`.

> As cidades do dropdown já incluem o sufixo `,BR` para garantir que busquem cidades brasileiras (ex.: Salvador,BR).

## Estrutura
- `App.js` e `index.js`: bootstrap do app Expo.
- `src/screens/HomeScreen.js`: dropdown de cidades, disparo da busca e estados de erro/carregamento.
- `src/components/WeatherResult.js`: card com icone, temperatura, sensacao termica, umidade e vento.
- `src/services/weatherService.js`: integracao com a API do OpenWeatherMap e leitura de variaveis de ambiente via `app.config.js`.
- `src/styles/*.js`: estilos das telas e componentes.

## Principais libs
Expo 54, React 19, React Native 0.81, `expo-linear-gradient`, `react-native-element-dropdown`, `react-native-picker-select`, `prop-types`.

## Observacoes
- Respostas carregadas em pt-br com unidades metricas.
- A lista inicial contem cidades brasileiras, mas voce pode digitar manualmente.
- Licenca 0BSD conforme `package.json`.
