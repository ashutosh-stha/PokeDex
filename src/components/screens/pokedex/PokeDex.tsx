import React, {useEffect, useState} from 'react';
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

  useEffect(() => {
    dispatch.pokemon.loadPokemon({});
  }, [dispatch.pokemon]);

  useEffect(() => {
    setPokemonList(data);
  }, [data]);

  useEffect(() => {
    const debounceSearch = _.debounce(() => {
      setPokemonList(
        data.filter(item => item.name.includes(searchTerm.toLowerCase())),
      );
    }, 300);
    debounceSearch();
    return () => {
      debounceSearch.cancel();
    };
  }, [data, searchTerm]);

  const onButtonPress = (pokemon: Pokemon) => {
    const selectedList = _.xor(selectedPokemon, [pokemon]);
    setSelectedPokemon(selectedList);
  };

  const renderPokemon = (pokemon: Pokemon) => {
    return (
      <PokemonItem
        key={pokemon.name}
        pokemon={pokemon}
        onPress={() => {
          onButtonPress(pokemon);
        }}
        selected={selectedPokemon.includes(pokemon)}
      />
    );
  };

  const onClear = () => {
    setSearchTerm('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          value={searchTerm}
          placeholder="Search Pokemon"
          onChangeText={text => setSearchTerm(text)}
        />
        <Button title="Clear" onPress={onClear} />
      </View>
      <FlatList
        keyExtractor={item => item.name}
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
