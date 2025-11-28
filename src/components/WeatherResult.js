import React from "react";
import { View, Text, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import styles from "../styles/weatherStyles";

const DEG = String.fromCharCode(176);

const COLORS = {
  sun: "#ffd166",
  cloud: "#cfd8dc",
  cloudDark: "#9aa5b1",
  rain: "#76b8ff",
  storm: "#9fa8da",
  snow: "#e0f4ff",
};

const iconByPrefix = {
  "01": { name: "sunny", color: COLORS.sun }, // ceu limpo
  "03": { name: "cloudy-outline", color: COLORS.cloud }, // nublado leve
  "04": { name: "cloudy", color: COLORS.cloudDark }, // nublado pesado
  "09": { name: "rainy", color: COLORS.rain }, // chuva leve
  "10": { name: "rainy-outline", color: COLORS.rain }, // chuva
  "11": { name: "thunderstorm", color: COLORS.storm }, // trovoadas
  "13": { name: "snow", color: COLORS.snow }, // neve
  "50": { name: "cloudy-outline", color: COLORS.cloud }, // nevoa
};

const buildIcon = (iconCode, size, style, isForecast = false) => {
  const prefix = (iconCode || "").substring(0, 2);

  if (prefix === "02") {
    const sunSize = Math.round(size * 0.7);
    const cloudSize = Math.round(size * 0.8);
    return (
      <View
        style={[
          styles.partlyWrapper,
          style,
          { width: size, height: size },
          isForecast && styles.partlyWrapperSmall,
        ]}
      >
        <Ionicons
          name="sunny"
          size={sunSize}
          color={COLORS.sun}
          style={styles.partlySun}
        />
        <Ionicons
          name="cloudy"
          size={cloudSize}
          color={COLORS.cloud}
          style={styles.partlyCloud}
        />
      </View>
    );
  }

  const cfg = iconByPrefix[prefix] || { name: "cloudy-outline", color: "#e8eef9" };
  return <Ionicons name={cfg.name} size={size} color={cfg.color} style={style} />;
};

const formataDiaCurto = (dataISO) => {
  const data = new Date(`${dataISO}T12:00:00`);
  const diaSemana = data
    .toLocaleDateString("pt-BR", { weekday: "short" })
    .replace(".", "")
    .toUpperCase();
  const diaMes = data.toLocaleDateString("pt-BR", { day: "2-digit" });
  return `${diaSemana} ${diaMes}`;
};

export default function WeatherResult({ dados, previsao = [] }) {
  if (!dados) return null;

  const {
    name,
    main: { temp, feels_like, humidity },
    wind: { speed },
    weather,
  } = dados;
  const iconeAtual = weather?.[0]?.icon;

  return (
    <View style={styles.cardShadow}>
      <LinearGradient
        colors={["#1f2b4f", "#2f5fb3", "#1fa2ff"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.cardContainer}
      >
        <View style={styles.headerRow}>
          <View style={styles.cityBlock}>
            <Text style={styles.cityText}>{name}</Text>
            <Text style={styles.descText}>{weather[0].description}</Text>
          </View>

          <View style={styles.tempBadge}>
            <Text style={styles.tempText}>
              {Math.round(temp)}
              {DEG}C
            </Text>
            <Text style={styles.badgeLabel}>
              Sensacao {Math.round(feels_like)}
              {DEG}C
            </Text>
          </View>
        </View>

        <View style={styles.contentRow}>
          <View style={styles.iconHolder}>{buildIcon(iconeAtual, 120)}</View>

          <View style={styles.infoGrid}>
            <View style={styles.infoCard}>
              <Text style={styles.infoLabel}>Umidade</Text>
              <Text style={styles.infoValue}>{humidity}%</Text>
            </View>

            <View style={styles.infoCard}>
              <Text style={styles.infoLabel}>Vento</Text>
              <Text style={styles.infoValue}>{Math.round(speed)} km/h</Text>
            </View>

            <View style={styles.infoCard}>
              <Text style={styles.infoLabel}>Sensacao</Text>
              <Text style={styles.infoValue}>
                {Math.round(feels_like)}
                {DEG}C
              </Text>
            </View>
          </View>
        </View>

        {Array.isArray(previsao) && previsao.length > 0 ? (
          <View style={styles.forecastSection}>
            <Text style={styles.sectionTitle}>Proximos 5 dias</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.forecastScroll}
            >
              {previsao.map((dia) => (
                <View style={styles.forecastCard} key={dia.data}>
                  <Text style={styles.forecastDay}>{formataDiaCurto(dia.data)}</Text>
                  {buildIcon(dia.icone, 44, styles.forecastIcon, true)}
                  <Text style={styles.forecastTemp}>
                    {dia.tempMax}
                    {DEG} / {dia.tempMin}
                    {DEG}
                  </Text>
                  <Text style={styles.forecastDesc}>{dia.descricao}</Text>
                </View>
              ))}
            </ScrollView>
          </View>
        ) : null}
      </LinearGradient>
    </View>
  );
}
