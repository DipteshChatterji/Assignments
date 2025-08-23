import { isWeb } from '@gluestack-ui/nativewind-utils/IsWeb';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 16,
    marginVertical: 8,
    borderRadius: 12,
    width: isWeb ? '100%' : '90%',
  },
  row: { flexDirection: 'row', alignItems: 'center' },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#999',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  textContainer: { flex: isWeb ? 1 : 0.9, justifyContent: 'center' },
  text: { fontSize: 16 },
  strike: {
    position: 'absolute',
    height: 2,
    backgroundColor: '#999',
    top: '35%',
    left: 0,
  },
  deleteButton: {
      marginRight: 4,
      marginLeft: isWeb ? 4 : 0,
  },
  deleteText: {
    fontSize: 18,
    color: 'red',
  },
});
