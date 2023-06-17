import {Models} from '@rematch/core';
import {pokemon} from './pokemon/pokemon';
import {httpClient} from './httpClient/httpClient';

export interface RootModel extends Models<RootModel> {
  pokemon: typeof pokemon;
  httpClient: typeof httpClient;
}

export const models: RootModel = {httpClient, pokemon};
