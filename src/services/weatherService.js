import Constants from "expo-constants";

const API_KEY = Constants.expoConfig.extra.apiKey;
const ESTADOS_BR = new Set([
  "acre",
  "ac",
  "alagoas",
  "al",
  "amapa",
  "ap",
  "amazonas",
  "am",
  "bahia",
  "ba",
  "ceara",
  "ce",
  "distrito federal",
  "df",
  "espirito santo",
  "es",
  "goias",
  "go",
  "maranhao",
  "ma",
  "mato grosso",
  "mt",
  "mato grosso do sul",
  "ms",
  "minas gerais",
  "mg",
  "para",
  "pa",
  "paraiba",
  "pb",
  "parana",
  "pr",
  "pernambuco",
  "pe",
  "piaui",
  "pi",
  "rio de janeiro",
  "rj",
  "rio grande do norte",
  "rn",
  "rio grande do sul",
  "rs",
  "rondonia",
  "ro",
  "roraima",
  "rr",
  "santa catarina",
  "sc",
  "sao paulo",
  "sp",
  "sergipe",
  "se",
  "tocantins",
  "to",
]);

const normalizaEstado = (valor) =>
  (valor || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .toLowerCase();

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

    const hojeLocal = new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .split("T")[0];

    const diasAgrupados = json.list.reduce((acc, item) => {
      const data = item.dt_txt.split(" ")[0];
      if (data === hojeLocal) return acc; // ignora o dia atual, exibido no card principal
      if (!acc[data]) acc[data] = [];
      acc[data].push(item);
      return acc;
    }, {});

    const previsoes = Object.entries(diasAgrupados)
      .slice(0, 5) // agora ja sem o dia atual
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

export async function buscarSugestoesCidade(termo) {
  const termoLimpo = (termo || "").trim();
  if (!termoLimpo) return [];
  const termoNormalizado = normalizaEstado(termoLimpo);

  const url = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(
    termoLimpo
  )},BR&limit=10&appid=${API_KEY}`;

  try {
    const resposta = await fetch(url);
    const json = await resposta.json();

    if (!Array.isArray(json)) return [];

    const filtradas = json
      .filter((cidade) => {
        const estadoValido = ESTADOS_BR.has(normalizaEstado(cidade.state));
        const nomeNormalizado = normalizaEstado(cidade.name);
        return (
          cidade.country === "BR" &&
          estadoValido &&
          cidade.name &&
          cidade.lat &&
          cidade.lon &&
          nomeNormalizado.startsWith(termoNormalizado)
        );
      })
      .map((cidade) => {
        const state = cidade.state ? ` - ${cidade.state}` : "";
        const nomeNormalizado = normalizaEstado(cidade.name);
        const id = `${cidade.name}-${cidade.state || "NA"}-${cidade.lat}-${cidade.lon}`;
        return {
          id,
          label: `${cidade.name}${state}`,
          value: `${cidade.name},BR`,
          nomeChave: nomeNormalizado,
          populacao: cidade.population || 0,
        };
      });

    const melhoresPorCidade = new Map();
    for (const item of filtradas) {
      const existente = melhoresPorCidade.get(item.nomeChave);
      if (!existente || item.populacao > existente.populacao) {
        melhoresPorCidade.set(item.nomeChave, item);
      }
    }

    return Array.from(melhoresPorCidade.values())
      .sort((a, b) => b.populacao - a.populacao || a.label.localeCompare(b.label))
      .map(({ nomeChave, populacao, ...resto }) => resto);
  } catch {
    return [];
  }
}
