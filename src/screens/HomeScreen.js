import React, { useMemo, useState } from "react";
import { View, Text } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { buscarClima, buscarPrevisao5Dias } from "../services/weatherService";
import WeatherResult from "../components/WeatherResult";
import styles from "../styles/homeStyles";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

export default function HomeScreen() {
  const [cidade, setCidade] = useState("");
  const [focus, setFocus] = useState(false);
  const [dados, setDados] = useState(null);
  const [previsao, setPrevisao] = useState([]);
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);

  const cidades = [
    { label: "Sao Paulo", value: "Sao Paulo,BR" },
    { label: "Rio de Janeiro", value: "Rio de Janeiro,BR" },
    { label: "Belo Horizonte", value: "Belo Horizonte,BR" },
    { label: "Curitiba", value: "Curitiba,BR" },
    { label: "Fortaleza", value: "Fortaleza,BR" },
    { label: "Salvador", value: "Salvador,BR" },
  ];

  const listaCidades = useMemo(() => {
    if (!cidade) return cidades;
    const selecionada = cidades.find((c) => c.value === cidade);
    const demais = cidades.filter((c) => c.value !== cidade);
    return selecionada ? [selecionada, ...demais] : cidades;
  }, [cidade]);

  const handleBuscar = async (cidadeSelecionada) => {
    const cidadeFinal = cidadeSelecionada || cidade;

    if (!cidadeFinal) {
      setErro("Selecione uma cidade.");
      return;
    }

    setLoading(true);
    const [climaAtual, previsao5Dias] = await Promise.all([
      buscarClima(cidadeFinal),
      buscarPrevisao5Dias(cidadeFinal),
    ]);
    setLoading(false);

    if (climaAtual.erro) {
      setErro(climaAtual.erro);
      setDados(null);
      setPrevisao([]);
      return;
    }

    setDados(climaAtual);

    if (Array.isArray(previsao5Dias)) {
      setErro("");
      setPrevisao(previsao5Dias);
    } else {
      setErro(previsao5Dias?.erro || "");
      setPrevisao([]);
    }
  };

  return (
    <LinearGradient colors={["#1f2b4f", "#2f5fb3", "#1fa2ff"]} style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.titulo}>Previsao do Tempo</Text>

        <View style={styles.dropdownShadow}>
          <LinearGradient
            colors={["#1a2f5a", "#264b82"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.dropdownGradient}
          >
            <Dropdown
              style={[
                styles.dropdown,
                focus && { borderColor: "#5fb0ff", borderWidth: 2 },
              ]}
              data={listaCidades}
              labelField="label"
              valueField="value"
              placeholder="Selecione a cidade"
              placeholderStyle={styles.dropdownPlaceholder}
              selectedTextStyle={styles.dropdownSelected}
              iconStyle={styles.dropdownIcon}
              activeColor="rgba(21,42,76,0.5)"
              itemContainerStyle={styles.dropdownItem}
              itemTextStyle={styles.dropdownItemText}
              containerStyle={{ borderRadius: 12, overflow: "hidden" }}
              value={cidade}
              renderLeftIcon={() => (
                <Ionicons
                  name="location-outline"
                  size={22}
                  color="#fff"
                  style={styles.dropdownLeftIcon}
                />
              )}
              onFocus={() => setFocus(true)}
              onBlur={() => setFocus(false)}
              onChange={async (item) => {
                setCidade(item.value);
                setFocus(false);
                await handleBuscar(item.value);
              }}
            />
          </LinearGradient>
        </View>

        {erro ? <Text style={styles.erro}>{erro}</Text> : null}

        {loading ? (
          <Text style={{ marginTop: 20, fontSize: 18, color: "#fff" }}>
            Carregando...
          </Text>
        ) : (
          <WeatherResult dados={dados} previsao={previsao} />
        )}
      </View>
    </LinearGradient>
  );
}
