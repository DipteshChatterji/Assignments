import React, { useState, useMemo, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Animated, {
  useSharedValue,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import AlbumCard from './AlbumCard';
import { useAudioPlayer } from './hooks/useAudioPlayer';
import { getResponsiveDimensions } from './utils/responsive';
import { styles } from './styles';
import { getAlbumStyle } from './utils/animations';

interface Album {
  id: string;
  image: string;
  title: string;
  artist: string;
  description: string;
  audioUrl: string;
}

interface MusicCarouselProps {
  albums?: Album[];
}

const MusicCarousel: React.FC<MusicCarouselProps> = ({ albums = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const rotation = useSharedValue(0);
  const dimensions = useMemo(() => getResponsiveDimensions(), []);

  // Audio hook with autoPlayOnLoad
  const { isPlaying: soundPlaying, togglePlay } = useAudioPlayer(
    albums[currentIndex]?.audioUrl,
    isPlaying
  );

  // Keep UI play state in sync
  useEffect(() => {
    setIsPlaying(soundPlaying);
  }, [soundPlaying]);

  if (albums.length === 0) {
    return (
      <View style={styles.centered}>
        <Text style={styles.noAlbumsText}>No albums available</Text>
      </View>
    );
  }

  const rotateNext = () => {
    rotation.value = withTiming(
      rotation.value + (2 * Math.PI) / albums.length,
      {
        duration: 1000,
        easing: Easing.bezier(0.25, 0.46, 0.45, 0.94),
      }
    );
    setCurrentIndex((prev) => (prev + 1) % albums.length);
    setIsPlaying((prev) => prev); // keep previous play state
  };

  const rotatePrev = () => {
    rotation.value = withTiming(
      rotation.value - (2 * Math.PI) / albums.length,
      {
        duration: 1000,
        easing: Easing.bezier(0.25, 0.46, 0.45, 0.94),
      }
    );
    setCurrentIndex((prev) => (prev - 1 + albums.length) % albums.length);
    setIsPlaying((prev) => prev);
  };

  const currentAlbum = albums[currentIndex];

  return (
    <>
      {/* Carousel */}
      <View style={styles.carouselContainer}>
        {albums.map((album, i) => {
          const animatedStyle = getAlbumStyle(
            rotation,
            i,
            albums.length,
            dimensions
          );
          return (
            <Animated.View key={album.id} style={animatedStyle}>
              <AlbumCard album={album} size={dimensions.itemSize} />
            </Animated.View>
          );
        })}
      </View>

      {/* Controls */}
      <View style={[styles.controls, { bottom: dimensions.controlsBottom }]}>
        <TouchableOpacity style={styles.button} onPress={rotatePrev}>
          <Text style={styles.buttonText}>‹</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.playButton]}
          onPress={togglePlay}
        >
          <Text style={styles.playButtonText}>{isPlaying ? '⏸️' : '▶️'}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={rotateNext}>
          <Text style={styles.buttonText}>›</Text>
        </TouchableOpacity>
      </View>

      {/* Description of current album */}
      <View
        style={[
          styles.descriptionContainer,
          { bottom: dimensions.descriptionBottom },
        ]}
      >
        <Text style={styles.description}>{currentAlbum?.description}</Text>
      </View>
    </>
  );
};

export default MusicCarousel;
