import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
  },

  titulo: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fdfefe",
    letterSpacing: 0.5,
    textShadowColor: "rgba(0,0,0,0.25)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
    marginBottom: 24,
  },

  dropdownShadow: {
    width: "100%",
    marginBottom: 18,
    shadowColor: "rgba(3, 17, 38, 0.8)",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 12,
    borderRadius: 18,
  },

  dropdownGradient: {
    borderRadius: 18,
    padding: 2,
  },

  searchContainer: {
    width: "100%",
    height: 64,
    backgroundColor: "rgba(255,255,255,0.08)",
    borderRadius: 14,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.25)",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  erro: {
    color: "#ffccd5",
    fontSize: 16,
    fontWeight: "600",
    marginTop: 10,
  },

  inputIcon: {
    marginRight: 8,
  },

  searchInput: {
    flex: 1,
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },

  searchButton: {
    backgroundColor: "#4a90e2",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
  },

  searchButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "800",
    letterSpacing: 0.3,
  },

  sugestoesBox: {
    width: "100%",
    marginTop: 10,
    backgroundColor: "rgba(8,22,46,0.92)",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    overflow: "hidden",
  },

  sugestaoItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.05)",
  },

  sugestaoText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
  },
});
