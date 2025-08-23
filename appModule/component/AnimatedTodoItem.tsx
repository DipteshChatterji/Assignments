import React, { useEffect, useRef } from 'react';
import { View, Pressable, StyleSheet, Text } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedProps,
  withTiming,
  withSpring,
  Easing,
  interpolateColor,
  interpolate,
} from 'react-native-reanimated';
import Svg, { Path } from 'react-native-svg';
import ConfettiCannon from 'react-native-confetti-cannon';
import { styles } from '../styles/todoItemsStyles';

const AnimatedPath = Animated.createAnimatedComponent(Path);

interface TodoItemProps {
  text: string;
  completed: boolean;
  onToggle: () => void;
  onDelete: () => void;
}

const AnimatedTodoItem: React.FC<TodoItemProps> = ({
  text,
  completed,
  onToggle,
  onDelete,
}) => {
  const progress = useSharedValue(completed ? 1 : 0);
  const bounce = useSharedValue(0);
  const confettiRef = useRef<ConfettiCannon>(null);
  const prevCompleted = useRef(completed);

  useEffect(() => {
    progress.value = withTiming(completed ? 1 : 0, {
      duration: 300,
      easing: Easing.out(Easing.ease),
    });
    bounce.value = withSpring(completed ? 1 : 0, {
      damping: 8,
      stiffness: 150,
    });

    if (!prevCompleted.current && completed && confettiRef.current) {
      confettiRef.current.start();
    }

    prevCompleted.current = completed;
  }, [completed]);

  const checkboxStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      progress.value,
      [0, 1],
      ['#fff', '#4ade80']
    ),
    borderColor: interpolateColor(progress.value, [0, 1], ['#999', '#4ade80']),
    transform: [
      { scale: withTiming(progress.value ? 1.2 : 1, { duration: 200 }) },
    ],
  }));

  const textStyle = useAnimatedStyle(() => ({
    color: interpolateColor(progress.value, [0, 1], ['#000', '#999']),
  }));

  const strikeStyle = useAnimatedStyle(() => ({
    width: `${progress.value * 90}%`,
  }));

  const cardStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: interpolate(progress.value, [0, 1], [0, -5]) }],
  }));

  const animatedPathProps = useAnimatedProps(() => ({
    strokeDashoffset: interpolate(progress.value, [0, 1], [30, 0]),
  }));

  return (
    <Animated.View style={[styles.card, cardStyle]}>
      <View style={styles.row}>
        <Pressable style={styles.row} onPress={onToggle}>
          <Animated.View style={[styles.checkbox, checkboxStyle]}>
            <Svg width={20} height={20} viewBox="0 0 24 24">
              <AnimatedPath
                d="M4 12 L10 18 L20 6"
                stroke="#fff"
                strokeWidth={2.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray={30}
                animatedProps={animatedPathProps}
                fill="none"
              />
            </Svg>
          </Animated.View>

          <View style={styles.textContainer}>
            <Animated.Text style={[styles.text, textStyle]}>
              {text}
            </Animated.Text>
            <Animated.View style={[styles.strike, strikeStyle]} />
          </View>
        </Pressable>

        <Pressable onPress={onDelete} style={styles.deleteButton}>
          <Text style={styles.deleteText}>X</Text>
        </Pressable>
      </View>
      <ConfettiCannon
        count={50}
        origin={{ x: 20, y: 0 }}
        explosionSpeed={150}
        fallSpeed={2000}
        autoStart={false}
        fadeOut
        ref={confettiRef}
      />
    </Animated.View>
  );
};

export default AnimatedTodoItem;
