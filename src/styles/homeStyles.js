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

  dropdown: {
    width: "100%",
    height: 64,
    backgroundColor: "rgba(255,255,255,0.08)",
    borderRadius: 14,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.25)",
    justifyContent: "center",
  },

  dropdownPlaceholder: {
    color: "rgba(255,255,255,0.75)",
    fontSize: 16,
    fontWeight: "500",
  },

  dropdownSelected: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "800",
  },

  dropdownIcon: {
    width: 22,
    height: 22,
  },

  dropdownLeftIcon: {
    marginRight: 8,
  },

  dropdownItem: {
    backgroundColor: "rgba(8,22,46,0.9)",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.06)",
    paddingVertical: 12,
  },

  dropdownItemText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },

  botao: {
    backgroundColor: "#4a90e2",
    padding: 15,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,

    marginBottom: 15,
  },

  textoBotao: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
    letterSpacing: 0.3,
  },

  erro: {
    color: "#ffccd5",
    fontSize: 16,
    fontWeight: "600",
    marginTop: 10,
  },
});
