import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', paddingTop: 20 },
  inputRow: { flexDirection: 'row', paddingHorizontal: 16, marginBottom: 16 },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginRight: 8,
    height: 40,
    color: 'black',
  },
  flatListContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
