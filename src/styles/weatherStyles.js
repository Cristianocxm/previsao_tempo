import { StyleSheet } from "react-native";

export default StyleSheet.create({
  cardShadow: {
    width: "100%",
    marginTop: 20,
    borderRadius: 24,
    shadowColor: "rgba(3, 17, 38, 0.75)",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 12,
  },

  cardContainer: {
    width: "100%",
    borderRadius: 24,
    padding: 20,
    overflow: "hidden",
  },

  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },

  cityBlock: {
    flex: 1,
  },

  cityText: {
    fontSize: 26,
    fontWeight: "800",
    color: "#fff",
    letterSpacing: 0.6,
  },

  descText: {
    marginTop: 4,
    fontSize: 16,
    color: "rgba(255,255,255,0.85)",
    textTransform: "capitalize",
  },

  tempBadge: {
    backgroundColor: "rgba(255,255,255,0.12)",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.35)",
    alignItems: "center",
    minWidth: 140,
  },

  tempText: {
    fontSize: 38,
    fontWeight: "900",
    color: "#fff",
    textShadowColor: "rgba(0,0,0,0.25)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
  },

  badgeLabel: {
    fontSize: 13,
    color: "rgba(255,255,255,0.85)",
    marginTop: 4,
  },

  contentRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 6,
  },

  iconHolder: {
    width: 140,
    height: 140,
    alignItems: "center",
    justifyContent: "center",
  },

  partlyWrapper: {
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },

  partlyWrapperSmall: {
    transform: [{ scale: 0.9 }],
  },

  partlySun: {
    position: "absolute",
    top: 6,
    left: 10,
  },

  partlyCloud: {
    position: "absolute",
    bottom: 2,
    right: 6,
  },

  infoGrid: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginLeft: 12,
  },

  infoCard: {
    width: "48%",
    backgroundColor: "rgba(255,255,255,0.14)",
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.25)",
    marginBottom: 12,
  },

  infoLabel: {
    fontSize: 14,
    color: "rgba(255,255,255,0.85)",
    marginBottom: 4,
  },

  infoValue: {
    fontSize: 20,
    fontWeight: "800",
    color: "#fff",
  },

  forecastSection: {
    marginTop: 12,
  },

  sectionTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 10,
    letterSpacing: 0.2,
  },

  forecastScroll: {
    paddingRight: 6,
  },

  forecastCard: {
    width: 110,
    backgroundColor: "rgba(255,255,255,0.14)",
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.25)",
    alignItems: "center",
    marginRight: 12,
  },

  forecastDay: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "700",
  },

  forecastIcon: {
    marginVertical: 6,
  },

  forecastTemp: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "800",
  },

  forecastDesc: {
    color: "rgba(255,255,255,0.9)",
    fontSize: 12,
    textAlign: "center",
    textTransform: "capitalize",
    marginTop: 4,
  },
});
