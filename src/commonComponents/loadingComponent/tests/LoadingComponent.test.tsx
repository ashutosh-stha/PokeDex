import React from 'react';
import {render} from '@testing-library/react-native';
import {LoadingComponent} from '../LoadingComponent';

const wrapper = render(<LoadingComponent />);

describe('LoadingComponent', () => {
  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
