import {createModel} from '@rematch/core';
import {RootModel} from '../models';
import ApiService from '../../controller/ApiService';

const BASE_URL = 'https://pokeapi.co/api/v2';

interface HttpClientState {
  apiService?: ApiService;
}

const initialState: HttpClientState = {
  apiService: undefined,
};

export const httpClient = createModel<RootModel>()({
  state: initialState,
  reducers: {
    setApiService(state, payload) {
      return {...state, apiService: payload};
    },
  },
  effects: dispatch => ({
    initializeHttpClient() {
      const apiService = new ApiService(BASE_URL);
      dispatch.httpClient.setApiService(apiService);
    },
  }),
});
