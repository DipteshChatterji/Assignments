import { useEffect, useState } from 'react';
import { Audio } from 'expo-av';

export function useAudioPlayer(audioUrl?: string, autoPlayOnLoad = false) {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    let currentSound: Audio.Sound | null = null;

    const loadSound = async () => {
      if (!audioUrl) return;

      // stop and unload previous sound
      if (sound) {
        try {
          await sound.stopAsync();
          await sound.unloadAsync();
        } catch (e) {}
      }

      // create new sound, don't auto-play
      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: audioUrl },
        { shouldPlay: false }
      );

      setSound(newSound);
      currentSound = newSound;

      // If previous album was playing, start this one
      if (autoPlayOnLoad) {
        await newSound.playAsync();
        setIsPlaying(true);
      } else {
        setIsPlaying(false);
      }
    };

    loadSound();

    return () => {
      if (currentSound) currentSound.unloadAsync();
    };
  }, [audioUrl, autoPlayOnLoad]); // ⚡ autoPlayOnLoad triggers playback on album change

  const togglePlay = async () => {
    if (!sound) return;
    if (isPlaying) {
      await sound.pauseAsync();
      setIsPlaying(false);
    } else {
      await sound.playAsync();
      setIsPlaying(true);
    }
  };

  return { isPlaying, togglePlay };
}
