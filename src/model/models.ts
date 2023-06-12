import {Models} from '@rematch/core';
import {pokemon} from './pokemon/pokemon';

export interface RootModel extends Models<RootModel> {
  pokemon: typeof pokemon;
}

export const models: RootModel = {pokemon};
