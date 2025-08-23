import { interpolate, useAnimatedStyle } from 'react-native-reanimated';

export const getAlbumStyle = (rotation, index, total, dimensions) => {
  return useAnimatedStyle(() => {
    const angle = rotation.value + (index / total) * 2 * Math.PI;
    const x = dimensions.radius * Math.sin(angle);
    const z = dimensions.radius * Math.cos(angle);

    // scale zones
    const frontZone = dimensions.radius * 0.85;
    const nearZone = dimensions.radius * 0.65;
    const midZone = dimensions.radius * 0.35;
    const backZone = dimensions.radius * 0.15;

    let scale;
    if (z > frontZone) scale = 1.2;
    else if (z > nearZone) scale = interpolate(z, [nearZone, frontZone], [1.05, 1.2]);
    else if (z > midZone) scale = interpolate(z, [midZone, nearZone], [0.8, 1.05]);
    else if (z > backZone) scale = interpolate(z, [backZone, midZone], [0.6, 0.8]);
    else scale = interpolate(z, [-dimensions.radius, backZone], [0.3, 0.6]);

    let opacity;
    if (z > frontZone) opacity = 1;
    else if (z > nearZone) opacity = interpolate(z, [nearZone, frontZone], [0.9, 1]);
    else if (z > midZone) opacity = interpolate(z, [midZone, nearZone], [0.7, 0.9]);
    else if (z > backZone) opacity = interpolate(z, [backZone, midZone], [0.4, 0.7]);
    else opacity = interpolate(z, [-dimensions.radius, backZone], [0.15, 0.4]);

    let rotateY;
    if (z > frontZone) rotateY = 0;
    else if (z > nearZone) rotateY = interpolate(z, [nearZone, frontZone], [3, 0]);
    else if (z > midZone) rotateY = interpolate(z, [midZone, nearZone], [15, 3]);
    else if (z > backZone) rotateY = interpolate(z, [backZone, midZone], [30, 15]);
    else rotateY = interpolate(z, [-dimensions.radius, backZone], [-50, 30]);

    let translateY;
    if (z > frontZone) translateY = 0;
    else if (z > nearZone) translateY = interpolate(z, [nearZone, frontZone], [5, 0]);
    else if (z > midZone) translateY = interpolate(z, [midZone, nearZone], [15, 5]);
    else if (z > backZone) translateY = interpolate(z, [backZone, midZone], [25, 15]);
    else translateY = interpolate(z, [-dimensions.radius, backZone], [40, 25]);

    return {
      position: 'absolute',
      left: dimensions.centerX - dimensions.itemSize / 2,
      top: dimensions.centerY - dimensions.itemSize / 2 - 50,
      transform: [
        { perspective: 1200 as number },
        { translateX: x as number },
        { translateY: translateY as number },
        { scale: scale as number },
        { rotateY: `${rotateY}deg` as string },
      ] as const,
      opacity,
      zIndex: z > dimensions.radius * 0.8 ? 1000 : Math.round(scale * 100),
    };
  });
};
