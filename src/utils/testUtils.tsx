import React from 'react';
import {Provider} from 'react-redux';
import {Store} from 'redux';
import {init} from '@rematch/core';
import {render} from '@testing-library/react-native';
import {NavigationContainer} from '@react-navigation/native';

type WrapWithStore = {
  children: any;
};
type InitPropsType = {
  wrapper?: any;
};
const wrapWithStore = (store: Store) => {
  return ({children}: WrapWithStore) => (
    <Provider store={store}>
      <NavigationContainer>{children}</NavigationContainer>
    </Provider>
  );
};
class ComponentRenderer {
  private component;
  private models: any;
  private store: any;
  constructor(component: any) {
    this.component = component;
  }

  withModels(models: any) {
    this.models = models;
    return this;
  }
  render() {
    const initProps: InitPropsType = {};
    if (this.models) {
      initProps.wrapper = wrapWithStore(init({models: this.models}));
    }
    return render(this.component, initProps);
  }
}
export function componentRenderer(component: any) {
  return new ComponentRenderer(component);
}
