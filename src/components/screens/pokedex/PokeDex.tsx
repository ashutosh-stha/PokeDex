import React, {useEffect, useRef, useState} from 'react';
import {Button, FlatList, StyleSheet, TextInput, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Dispatch, RootState} from '../../../model/store';
import {Pokemon} from '../../../model/pokemon/pokemon';
import {PokemonItem} from './PokemonItem';
import _ from 'lodash';

export const PokeDex = () => {
  const dispatch = useDispatch<Dispatch>();
  const data = useSelector((state: RootState) => state.pokemon?.pokemonList);

  const [pokemonList, setPokemonList] = useState<Array<Pokemon>>([]);
  const [selectedPokemon, setSelectedPokemon] = useState<Array<Pokemon>>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    dispatch.pokemon.loadPokemon();
  }, [dispatch.pokemon]);

  useEffect(() => {
    setPokemonList(data);
  }, [data]);

  useEffect(() => {
    setPokemonList(
      data.filter(item => item.name.includes(searchTerm.toLowerCase())),
    );
  }, [data, searchTerm]);

  const onButtonPress = (pokemon: Pokemon) => {
    const selectedList = _.xor(selectedPokemon, [pokemon]);
    setSelectedPokemon(selectedList);
  };

  const renderPokemon = (pokemon: Pokemon) => {
    return (
      <PokemonItem
        pokemon={pokemon}
        onPress={() => {
          onButtonPress(pokemon);
        }}
        selected={selectedPokemon.includes(pokemon)}
      />
    );
  };

  const onClear = () => {
    inputRef?.current?.clear();
    inputRef?.current?.focus();
    setPokemonList(data);
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          ref={inputRef}
          style={styles.textInput}
          value={searchTerm}
          onChangeText={text => setSearchTerm(text)}
        />
        <Button title="Clear" onPress={onClear} />
      </View>
      <FlatList
        style={styles.container}
        data={pokemonList}
        numColumns={2}
        renderItem={({item}) => renderPokemon(item)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textInput: {
    borderWidth: 2,
    padding: 10,
    margin: 20,
    borderRadius: 10,
    flex: 0.9,
  },
  inputContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
});
