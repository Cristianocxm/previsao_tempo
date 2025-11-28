import Constants from "expo-constants";

const API_KEY = Constants.expoConfig.extra.apiKey;

export async function buscarClima(cidade) {
  if (!cidade) return { erro: "Digite uma cidade." };

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
    cidade
  )}&appid=${API_KEY}&units=metric&lang=pt_br`;

  try {
    const resposta = await fetch(url);
    const json = await resposta.json();

    if (json.cod !== 200) {
      return { erro: "Cidade nao encontrada." };
    }

    return json;
  } catch {
    return { erro: "Erro ao buscar os dados." };
  }
}

export async function buscarPrevisao5Dias(cidade) {
  if (!cidade) return { erro: "Digite uma cidade." };

  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(
    cidade
  )}&appid=${API_KEY}&units=metric&lang=pt_br`;

  try {
    const resposta = await fetch(url);
    const json = await resposta.json();

    if (json.cod !== "200") {
      return { erro: "Nao foi possivel carregar a previsao estendida." };
    }

    const diasAgrupados = json.list.reduce((acc, item) => {
      const data = item.dt_txt.split(" ")[0];
      if (!acc[data]) acc[data] = [];
      acc[data].push(item);
      return acc;
    }, {});

    const previsoes = Object.entries(diasAgrupados)
      .slice(0, 5)
      .map(([data, itens]) => {
        const alvoMeioDia =
          itens.find((it) => it.dt_txt.includes("12:00:00")) || itens[0];
        const temps = itens.map((it) => it.main.temp);
        return {
          data,
          tempMin: Math.round(Math.min(...temps)),
          tempMax: Math.round(Math.max(...temps)),
          descricao: alvoMeioDia.weather[0].description,
          icone: alvoMeioDia.weather[0].icon,
        };
      });

    return previsoes;
  } catch {
    return { erro: "Erro ao buscar a previsao dos proximos dias." };
  }
}
