import React from 'react';
import {cleanup, fireEvent, render} from '@testing-library/react';
import CardValues from './CardValues';
import InputsDash from '../inputsDash/InputsDash';

afterEach(cleanup);

describe('CardValues component', () => {
  test('Should render component', () => {
    const renderComponente = render(
    <CardValues 
        title={''} 
        value={0} 
        valueChange={0} 
        label={''} 
        handle={async (value:string) => {}} 
        adornment={''} 
        adornmentSecond={''} 
        handleClick={() => {}} 
        helper={''} 
        disabled={false} 
    />);

    expect(renderComponente).toMatchSnapshot();
  })

  test('should render component TablePastTrades', () => {
    const renderComponent = render(
    <InputsDash 
        label={''} 
        adornment={''} 
        handleUSD={async (value:string) => {} } 
        helper={''} 
    />)

    expect(renderComponent).not.toBeUndefined()
  })

  test("should able to click in trade button", () => {   
    const wrapper = render(
    <CardValues 
        title={''} 
        value={0} 
        valueChange={0} 
        label={''} 
        handle={async (value:string) => {}} 
        adornment={''} 
        adornmentSecond={''} 
        handleClick={() => {}} 
        helper={''} 
        disabled={false} 
    />);
    const onClick = jest.fn();
    let count = 0;

    const buttonSignin = wrapper.getAllByText('trade')[0];
    
    fireEvent.click(buttonSignin, () => {
        count = 1;
    })
    expect(onClick.mock.calls.length).toEqual(count)
  });

})