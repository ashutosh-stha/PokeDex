import {createModel} from '@rematch/core';
import {RootModel} from '../models';
import ApiService from '../../controller/ApiService';

export interface Pokemon {
  name: string;
  url: string;
}

interface PokemonState {
  pokemonList: Pokemon[];
}

const BASE_URL = 'https://pokeapi.co/api/v2';

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
    async loadPokemon() {
      const apiService = new ApiService(BASE_URL);
      const pokemonData = await apiService.get<any>(
        '/pokemon?offset=30&limit=30',
      );
      dispatch.pokemon.setPokemonList(pokemonData.results);
    },
  }),
});
