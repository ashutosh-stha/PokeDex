import React from 'react';
import {render} from '@testing-library/react-native';
import AnimatedDots from '../AnimatedDots';

const wrapper = render(<AnimatedDots />);
describe('AnimatedDots', () => {
  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
