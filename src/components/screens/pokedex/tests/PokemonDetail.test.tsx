import React from 'react';
import {componentRenderer} from '../../../../utils/testUtils';
import {PokemonDetail as PokemonDetailType} from '../../../../model/pokemon/pokemon';
import {PokemonDetail} from '../PokemonDetail';

const POKEMON_DETAIL: PokemonDetailType = {
  name: 'Pikachu',
  id: 1,
  types: [{type: {name: 'electric'}}],
  sprites: {front_default: 'url'},
};

const MOCK_LOAD_POKEMON_DETAIL = jest.fn();
const MOCK_SET_POKEMON_DETAIL = jest.fn();

const MOCK_NAVIGATE = jest.fn();
jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: MOCK_NAVIGATE,
    }),
    useRoute: () => ({
      params: {
        pokemon: 'Pikachu',
      },
    }),
  };
});

const renderWrapper = () =>
  componentRenderer(PokemonDetail)
    .withModels({
      loading: {
        state: {effects: {pokemon: {loadPokemonDetail: false}}},
      },
      pokemon: {
        state: {pokemonDetail: POKEMON_DETAIL},
        effects: () => ({
          loadPokemonDetail: MOCK_LOAD_POKEMON_DETAIL,
          setPokemonDetail: MOCK_SET_POKEMON_DETAIL,
        }),
      },
    })
    .render();

const renderWrapperWithLoadingTrue = () =>
  componentRenderer(PokemonDetail)
    .withModels({
      loading: {
        state: {effects: {pokemon: {loadPokemonDetail: true}}},
      },
      pokemon: {
        state: {pokemonDetail: undefined},
        effects: () => ({
          loadPokemonDetail: MOCK_LOAD_POKEMON_DETAIL,
          setPokemonDetail: MOCK_SET_POKEMON_DETAIL,
        }),
      },
    })
    .render();

let wrapper: any;
describe('PokemonDetail', () => {
  beforeEach(() => {
    wrapper = renderWrapper();
  });
  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
  it('when data is loading', () => {
    wrapper = renderWrapperWithLoadingTrue();
    expect(wrapper).toMatchSnapshot();
  });
});
