import React from 'react';
import {StyleSheet, View} from 'react-native';
import AnimatedDots from './AnimatedDots';

export const LoadingComponent: React.FC = () => {
  return (
    <View style={styles.container}>
      <AnimatedDots />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
