import React, { useEffect, useRef, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Keyboard } from "react-native";
import {
  buscarClima,
  buscarPrevisao5Dias,
  buscarSugestoesCidade,
} from "../services/weatherService";
import WeatherResult from "../components/WeatherResult";
import styles from "../styles/homeStyles";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

export default function HomeScreen() {
  const [inputCidade, setInputCidade] = useState("");
  const [cidadeValor, setCidadeValor] = useState("");
  const [focus, setFocus] = useState(false);
  const [dados, setDados] = useState(null);
  const [previsao, setPrevisao] = useState([]);
  const [sugestoes, setSugestoes] = useState([]);
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);
  const debounceRef = useRef(null);
  const buscaRef = useRef(0);

  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    if (!inputCidade.trim()) {
      setSugestoes([]);
      return undefined;
    }

    debounceRef.current = setTimeout(async () => {
      const token = ++buscaRef.current;
      const lista = await buscarSugestoesCidade(inputCidade);
      if (buscaRef.current === token) {
        setSugestoes(lista);
      }
    }, 350);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [inputCidade]);

  const cidadeNormalizada = () => {
    const texto = inputCidade.trim();
    if (cidadeValor) return cidadeValor;
    if (!texto) return "";
    return texto.includes(",") ? texto : `${texto},BR`;
  };

  const handleBuscar = async (cidadeSelecionada) => {
    const cidadeFinal = cidadeSelecionada || cidadeNormalizada();

    if (!cidadeFinal) {
      setErro("Digite ou selecione uma cidade.");
      return;
    }

    Keyboard.dismiss();
    setFocus(false);
    setErro("");
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
    setSugestoes([]);

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
            <View
              style={[
                styles.searchContainer,
                focus && { borderColor: "#5fb0ff", borderWidth: 2 },
              ]}
            >
              <Ionicons
                name="search"
                size={20}
                color="#d9e6ff"
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.searchInput}
                placeholder="Digite a cidade"
                placeholderTextColor="rgba(255,255,255,0.7)"
                value={inputCidade}
                onChangeText={(text) => {
                  setInputCidade(text);
                  setCidadeValor("");
                }}
                onSubmitEditing={() => handleBuscar()}
                returnKeyType="search"
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)}
              />
              <TouchableOpacity
                onPress={() => handleBuscar()}
                style={styles.searchButton}
                activeOpacity={0.8}
              >
                <Text style={styles.searchButtonText}>Buscar</Text>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </View>

        {sugestoes.length > 0 ? (
          <View style={styles.sugestoesBox}>
            {sugestoes.map((item) => (
              <TouchableOpacity
                key={item.id || item.value}
                style={styles.sugestaoItem}
                activeOpacity={0.8}
                onPress={() => {
                  setInputCidade(item.label);
                  setCidadeValor(item.value);
                  Keyboard.dismiss();
                  handleBuscar(item.value);
                }}
              >
                <Ionicons
                  name="location-outline"
                  size={18}
                  color="#cfe1ff"
                  style={{ marginRight: 8 }}
                />
                <Text style={styles.sugestaoText}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ) : null}

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
