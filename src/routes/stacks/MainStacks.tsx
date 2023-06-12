import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {PokeDex} from '../../components/screens/pokedex/PokeDex';

const MainStack = createNativeStackNavigator();

export const MainStackScreens: React.FC = () => {
  return (
    <MainStack.Navigator initialRouteName="Home">
      <MainStack.Screen
        name="PokeDex"
        component={PokeDex}
        options={{
          headerShown: true,
        }}
      />
    </MainStack.Navigator>
  );
};
