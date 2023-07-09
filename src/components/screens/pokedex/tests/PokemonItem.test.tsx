import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';
import {PokemonItem, PokemonItemProps} from '../PokemonItem';
import {Pokemon} from '../../../../model/pokemon/pokemon';

const MOCK_POKEMON_DATA: Pokemon = {
  name: 'Pikachu',
  url: 'url',
};

const defaultProps: PokemonItemProps = {
  onPress: jest.fn(),
  selected: false,
  pokemon: MOCK_POKEMON_DATA,
};

const renderWrapper = (props: PokemonItemProps | {}) =>
  render(<PokemonItem {...defaultProps} {...props} />);

describe('PokemonItem', () => {
  it('should render correctly', () => {
    expect(renderWrapper({})).toMatchSnapshot();
  });
  it('when user press the button', () => {
    const {getByTestId} = renderWrapper({});
    fireEvent.press(getByTestId('pokemonBtn'));
    expect(defaultProps.onPress).toHaveBeenCalled();
  });
  it('when the pokemon is selected', () => {
    expect(renderWrapper({selected: true})).toMatchSnapshot();
  });
});
