import {PokeDex} from '../PokeDex';
import {componentRenderer} from '../../../../utils/testUtils';
import {fireEvent, screen} from '@testing-library/react-native';
import '@testing-library/jest-native/extend-expect';
import {act} from 'react-test-renderer';

jest.useFakeTimers();

const MOCK_NAVIGATE = jest.fn();
jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: MOCK_NAVIGATE,
    }),
  };
});

const renderWrapper = () =>
  componentRenderer(PokeDex)
    .withModels({
      pokemon: {
        state: {
          pokemonList: [{name: 'Pikachu', url: 'url'}],
        },
        effects: () => ({loadPokemon: jest.fn()}),
      },
    })
    .render();

let wrapper: any;

describe('PokeDex', () => {
  beforeEach(() => {
    wrapper = renderWrapper();
  });
  it('should render correctly', () => {
    act(() => {
      fireEvent.press(screen.getByTestId('pokemonBtn'));
    });
    expect(wrapper).toMatchSnapshot();
  });
  it('when user types on the search box', () => {
    act(() => {
      jest.advanceTimersByTime(900);
      fireEvent(wrapper.getByTestId('searchBox'), 'onChangeText', 'Ditto');
    });
    expect(wrapper).toMatchSnapshot();
  });
  it('when user press the clear button', () => {
    act(() => {
      fireEvent(wrapper.getByTestId('searchBox'), 'onChangeText', 'Ditto');
      fireEvent.press(screen.getByTestId('clearBtn'));
    });
    expect(screen.getByTestId('searchBox')).toHaveTextContent('');
  });
  it('when user selects the pokemon button', async () => {
    act(() => {
      fireEvent.press(screen.getByTestId('pokemonBtn'));
    });

    expect(screen.getByTestId('pokemonBtn')).toHaveStyle({
      backgroundColor: '#262730',
      borderRadius: 30,
      flex: 0.5,
      margin: 8,
      opacity: 1,
      padding: 10,
    });
    expect(MOCK_NAVIGATE).toHaveBeenCalledWith('PokemonDetail', {
      pokemon: 'Pikachu',
    });
  });
});
