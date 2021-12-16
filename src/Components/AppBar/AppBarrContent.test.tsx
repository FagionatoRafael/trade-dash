import React from 'react';
import {cleanup, render} from '@testing-library/react';
import AppBarContent from './AppBarContent';

afterEach(cleanup);

describe('AppBarContent component', () => {
  test('Should render component', () => {
    const renderComponente = render(<AppBarContent title={''} />);

    expect(renderComponente).toMatchSnapshot();
  })

})