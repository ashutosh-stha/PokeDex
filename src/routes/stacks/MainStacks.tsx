import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import * as ScreenRoutes from '../routes/ScreenRoutes';

import {PokeDex} from '../../components/screens/pokedex/PokeDex';
import {PokemonDetail} from '../../components/screens/pokedex/PokemonDetail';

const MainStack = createNativeStackNavigator();

export const MainStackScreens: React.FC = () => {
  return (
    <MainStack.Navigator initialRouteName="Home">
      <MainStack.Screen
        name={ScreenRoutes.POKEDEX}
        component={PokeDex}
        options={{
          headerShown: true,
        }}
      />
      <MainStack.Screen
        name={ScreenRoutes.POKEMON_DETAIL}
        component={PokemonDetail}
        options={{
          headerShown: true,
        }}
      />
    </MainStack.Navigator>
  );
};
