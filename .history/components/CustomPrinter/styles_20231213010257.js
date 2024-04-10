import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  containerList: { flex: 1, flexDirection: 'column' },
  bluetoothStatusContainer: {flexDirection: 'row', justifyContent: 'space-between', },
  bluetoothStatus: color => ({
    backgroundColor: color,
    padding: 8,
    borderRadius: 2,
    color: 'white',
    paddingHorizontal: 10,
    marginBottom: 20,
    fontFamily: "Quicksand_500Medium",
    borderRadius: 10
  }),
  bluetoothInfo: { textAlign: 'center', fontSize: 14, color: '#FFC806', marginBottom: 20, fontFamily: "Quicksand_500Medium", },
  sectionTitle: { fontSize: 14, marginBottom: 12, fontFamily: "Quicksand_700Bold" },
  printerInfo: { textAlign: 'center', fontSize: 12, color: '#E9493F', marginBottom: 20, fontFamily: "Quicksand_500Medium" },
});