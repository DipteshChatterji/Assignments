import React from 'react';
import { Image } from 'react-native';
import { styles } from './styles';


interface AlbumCardProps {
  album: { id: string; image: string };
  size: number;
}

const AlbumCard: React.FC<AlbumCardProps> = ({ album, size }) => (
  <Image
    source={{ uri: album.image }}
    style={[styles.image, { width: size, height: size }]}
    resizeMode="cover"
  />
);

export default AlbumCard;
