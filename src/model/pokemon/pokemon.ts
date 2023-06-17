import {createModel} from '@rematch/core';
import {RootModel} from '../models';

export interface Pokemon {
  name: string;
  url: string;
}

interface PokemonResponse {
  results: any[];
}

interface PokemonState {
  pokemonList: Pokemon[];
}

const initialState: PokemonState = {
  pokemonList: [],
};

export const pokemon = createModel<RootModel>()({
  state: initialState,
  reducers: {
    setPokemonList(state, payload) {
      return {...state, pokemonList: payload};
    },
  },
  effects: dispatch => ({
    async loadPokemon(_, rootState) {
      const apiService = rootState.httpClient.apiService;
      try {
        const pokemonData = await apiService?.get<PokemonResponse>(
          '/pokemon?offset=30&limit=30',
        );
        if (pokemonData) {
          dispatch.pokemon.setPokemonList(pokemonData.results);
        }
      } catch (error) {
        // Handle any errors here
        console.error('Failed to load Pokemon:', error);
      }
    },
  }),
});
