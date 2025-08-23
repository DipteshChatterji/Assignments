import { StyleSheet, Platform } from 'react-native';

export const styles = StyleSheet.create({
  carouselContainer: {
    flex: 1,
    position: 'relative',
  },
  image: {
    borderRadius: 12,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
      },
      android: { elevation: 8 },
    }),
  },
  controls: {
    position: 'absolute',
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  button: {
    padding: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 35,
    minWidth: 65,
    minHeight: 65,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playButton: { backgroundColor: 'rgba(255, 255, 255, 1)', transform: [{ scale: 1.1 }] },
  buttonText: { fontSize: 26, fontWeight: 'bold', color: '#000' },
  playButtonText: { fontSize: 22 },
  descriptionContainer: { position: 'absolute', left: 20, right: 20, alignItems: 'center' },
  description: {
    color: '#fff',
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 21,
    fontWeight: '300',
    paddingHorizontal: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    paddingVertical: 8,
    borderRadius: 8,
  },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  noAlbumsText: { color: '#fff', fontSize: 18, fontWeight: '300' },
});
