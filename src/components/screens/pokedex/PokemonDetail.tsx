import React, {FC, useEffect} from 'react';
import {Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {Route, useRoute} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {Dispatch, RootState} from '../../../model/store';
import {LoadingComponent} from '../../../commonComponents/loadingComponent/LoadingComponent';

interface Props {
  pokemon?: string;
}

export const PokemonDetail: FC = () => {
  const dispatch = useDispatch<Dispatch>();
  const pokemonDetail = useSelector(
    (state: RootState) => state.pokemon?.pokemonDetail,
  );
  const pokemonDetailLoading = useSelector(
    (state: RootState) => state.loading.effects.pokemon.loadPokemonDetail,
  );
  const {params} = useRoute<Route<'Pokemon', Props>>();

  useEffect(() => {
    dispatch.pokemon.loadPokemonDetail(params.pokemon);
    return () => {
      dispatch.pokemon.setPokemonDetail(undefined);
    };
  }, [dispatch.pokemon, params.pokemon]);

  return (
    <SafeAreaView style={styles.container}>
      {pokemonDetailLoading ? (
        <LoadingComponent />
      ) : (
        <View style={styles.container}>
          <View style={styles.horizontalContainer}>
            <Image
              style={styles.defaultImage}
              source={{
                uri: `${pokemonDetail?.sprites.front_default}`,
              }}
            />
            <View
              style={[styles.verticalContainer, styles.descriptionContainer]}>
              <Text style={styles.title}>{pokemonDetail?.name}</Text>
              <Text style={styles.subHeader}>Type</Text>
              <View style={styles.horizontalContainer}>
                {pokemonDetail?.types.map(({type}) => {
                  return (
                    <Text style={styles.types} key={type.name}>
                      {type.name}
                    </Text>
                  );
                })}
              </View>
            </View>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  defaultImage: {
    width: 150,
    height: 150,
    resizeMode: 'stretch',
  },
  horizontalContainer: {
    flexDirection: 'row',
  },
  verticalContainer: {
    flexDirection: 'column',
  },
  descriptionContainer: {
    justifyContent: 'center',
    margin: 16,
  },
  title: {
    textTransform: 'capitalize',
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 10,
  },
  subHeader: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  types: {
    marginTop: 6,
    marginRight: 8,
    textTransform: 'capitalize',
  },
});
