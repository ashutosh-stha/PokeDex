import React from 'react';
import {Text} from 'react-native';
import {componentRenderer} from '../testUtils';

function MyComponent() {
  return <Text>Test Component</Text>;
}

describe('Component Renderer', () => {
  it('should render the component', () => {
    const renderResult = componentRenderer(<MyComponent />).render();
    expect(renderResult.getByText('Test Component')).toBeTruthy();
  });
});
