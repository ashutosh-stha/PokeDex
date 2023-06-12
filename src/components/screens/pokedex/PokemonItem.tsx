import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {Pokemon} from '../../../model/pokemon/pokemon';

interface PokemonItemProps {
  pokemon: Pokemon;
  onPress: () => void;

  selected: Boolean;
}

export const PokemonItem: React.FC<PokemonItemProps> = ({
  pokemon,
  onPress,
  selected,
}) => {
  return (
    <TouchableOpacity
      key={pokemon.name}
      style={[styles.container, selected && styles.selectedContainer]}
      onPress={onPress}>
      <Text style={styles.title}>{pokemon.name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 8,
    backgroundColor: '#77BA99',
    padding: 10,
    flex: 0.5,
    borderRadius: 30,
  },
  title: {
    textTransform: 'capitalize',
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  selectedContainer: {
    backgroundColor: '#262730',
  },
});
