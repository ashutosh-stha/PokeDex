import {createModel} from '@rematch/core';
import {RootModel} from '../models';

export interface Pokemon {
  name: string;
  url: string;
}

interface PokemonResponse {
  results: Pokemon[];
}

export type PokemonType = {
  name: string;
};
type Sprites = {
  back_default: string | null;
  back_female: string | null;
  back_shiny: string | null;
  back_shiny_female: string | null;
  front_default: string | null;
  front_female: string | null;
  front_shiny: string | null;
  front_shiny_female: string | null;
  other: {
    dream_world: {
      front_default: string | null;
      front_female: string | null;
    } | null;
    home: {
      front_default: string | null;
      front_female: string | null;
      front_shiny: string | null;
      front_shiny_female: string | null;
    } | null;
    'official-artwork': {
      front_default: string | null;
      front_shiny: string | null;
    } | null;
  };
};

interface PokemonDetail {
  id: number;
  name: string;
  types: {type: PokemonType}[];
  sprites: Sprites;
}

interface PokemonState {
  pokemonList: Pokemon[];
  pokemonDetail?: PokemonDetail;
}

const initialState: PokemonState = {
  pokemonList: [],
  pokemonDetail: undefined,
};
export const pokemon = createModel<RootModel>()({
  state: initialState,
  reducers: {
    setPokemonList(state, payload) {
      return {...state, pokemonList: payload};
    },
    setPokemonDetail(state, payload) {
      return {...state, pokemonDetail: payload};
    },
  },
  effects: dispatch => ({
    async loadPokemon(_, rootState) {
      const apiService = rootState.httpClient.apiService;
      try {
        const pokemonData = await apiService?.get<PokemonResponse>(
          '/pokemon?offset=100&limit=100',
        );
        if (pokemonData) {
          dispatch.pokemon.setPokemonList(pokemonData.results);
        }
      } catch (error) {
        // Handle any errors here
        console.error('Failed to load Pokemon:', error);
      }
    },
    async loadPokemonDetail(pokemonName, rootState) {
      const apiService = rootState.httpClient.apiService;
      try {
        const pokemonDetail = await apiService?.get<PokemonDetail>(
          `/pokemon/${pokemonName}`,
        );
        if (pokemonDetail) {
          dispatch.pokemon.setPokemonDetail(pokemonDetail);
        }
      } catch (error) {
        console.error('Failed to load Pokemon Detail:', error);
      }
    },
  }),
});
