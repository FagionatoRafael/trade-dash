import React from 'react';
import {cleanup, fireEvent, render, screen} from '@testing-library/react';
import InputsLogin from './InputsLogin';

afterEach(cleanup);

describe('Dash component', () => {
  test('Should render component', () => {
    const renderComponent = render(
    <InputsLogin 
        type={''}
        label={''}
        handle={async(value) => {}} 
    />);

    expect(renderComponent).toMatchSnapshot();
  })
})
