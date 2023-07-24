import React, {useEffect, useRef} from 'react';
import {StyleSheet, Animated, Easing} from 'react-native';

const AnimatedDots: React.FC = () => {
  const rotation = useRef(new Animated.Value(0)).current;
  const translation1 = useRef(new Animated.ValueXY({x: 0, y: 0})).current;
  const translation2 = useRef(new Animated.ValueXY({x: 0, y: 0})).current;
  const translation3 = useRef(new Animated.ValueXY({x: 0, y: 0})).current;
  const translation4 = useRef(new Animated.ValueXY({x: 0, y: 0})).current;

  useEffect(() => {
    // Loop the animation sequence indefinitely
    Animated.loop(
      Animated.stagger(1500, [
        // Rotation Animation
        Animated.timing(rotation, {
          toValue: 360,
          duration: 1000, // Adjust the duration for the rotation speed
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        // First animation to center position
        Animated.parallel([
          Animated.timing(translation1, {
            toValue: {x: 15, y: 15},
            duration: 500,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
          Animated.timing(translation2, {
            toValue: {x: -15, y: 15},
            duration: 500,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
          Animated.timing(translation3, {
            toValue: {x: 15, y: -15},
            duration: 500,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
          Animated.timing(translation4, {
            toValue: {x: -15, y: -15},
            duration: 500,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
        ]),
        // Second animation back to original positions
        Animated.parallel([
          Animated.timing(translation1, {
            toValue: {x: 0, y: 0},
            duration: 500,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
          Animated.timing(translation2, {
            toValue: {x: 0, y: 0},
            duration: 500,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
          Animated.timing(translation3, {
            toValue: {x: 0, y: 0},
            duration: 500,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
          Animated.timing(translation4, {
            toValue: {x: 0, y: 0},
            duration: 500,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
        ]),
      ]),
    ).start();
  }, [rotation, translation1, translation2, translation3, translation4]);

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [
            {
              rotate: rotation.interpolate({
                inputRange: [0, 360],
                outputRange: ['0deg', '360deg'],
              }),
            },
          ],
        },
      ]}>
      <Animated.View
        style={[
          styles.dot,
          styles.dot1,
          {transform: translation1.getTranslateTransform()},
        ]}
      />
      <Animated.View
        style={[
          styles.dot,
          styles.dot2,
          {transform: translation2.getTranslateTransform()},
        ]}
      />
      <Animated.View
        style={[
          styles.dot,
          styles.dot3,
          {transform: translation3.getTranslateTransform()},
        ]}
      />
      <Animated.View
        style={[
          styles.dot,
          styles.dot4,
          {transform: translation4.getTranslateTransform()},
        ]}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    position: 'relative',
    width: 40,
    height: 40,
  },
  dot: {
    position: 'absolute',
    height: 10,
    width: 10,
    borderRadius: 10,
    backgroundColor: 'black',
  },
  dot1: {
    top: 0,
    left: 0,
  },
  dot2: {
    top: 0,
    right: 0,
  },
  dot3: {
    bottom: 0,
    left: 0,
  },
  dot4: {
    bottom: 0,
    right: 0,
  },
});

export default AnimatedDots;
