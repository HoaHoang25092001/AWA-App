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
    paddingHorizontal: 14,
    marginBottom: 20,
  }),
  bluetoothInfo: { textAlign: 'center', fontSize: 16, color: '#FFC806', marginBottom: 20, fontFamily: "Quicksand_500Medium", },
  sectionTitle: { fontWeight: 'bold', fontSize: 18, marginBottom: 12 },
  printerInfo: { textAlign: 'center', fontSize: 16, color: '#E9493F', marginBottom: 20 },
});