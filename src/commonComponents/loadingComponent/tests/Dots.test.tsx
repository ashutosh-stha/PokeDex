import React from 'react';
import {render} from '@testing-library/react-native';
import Dots from '../Dots';

const wrapper = render(<Dots />);

describe('Dots', () => {
  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
