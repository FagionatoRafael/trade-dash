import React from 'react';
import {cleanup, render} from '@testing-library/react';
import InputsDash from './InputsDash';

afterEach(cleanup);

describe('InputsDash component', () => {
  test('Should render component', () => {
    const renderComponente = render(
    <InputsDash 
        label={''} 
        adornment={''} 
        handleUSD={async(value:string) => {}} 
        helper={''} 
    />);

    expect(renderComponente).toMatchSnapshot();
  })

})