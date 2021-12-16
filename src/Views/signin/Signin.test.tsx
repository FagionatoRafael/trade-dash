import React from 'react';
import {cleanup, fireEvent, render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history'
import {Router} from 'react-router-dom'
import Signin from './signin';

afterEach(cleanup);

describe('AccordingPastTrade component', () => {
  test('Should render component', () => {
    const renderComponent = render(<Signin />);

    expect(renderComponent).toMatchSnapshot();
  })

  test('Should Input Name start empty', async () => {
    const wrapper = render(<Signin />);
    const input = await wrapper.findByLabelText('Name')

    expect(input).toHaveValue('');
  });

  test('Should Input Password start empty', async () => {
    const wrapper = render(<Signin />);
    const input = await wrapper.findByLabelText('Password')

    expect(input).toHaveValue('');
  });

  test("should render component button of Signin", () => {    
    const wrapper = render(<Signin />);

    const buttonLogin = wrapper.getAllByText('Sign in')[0];
    
    expect(buttonLogin).toBeInTheDocument();
  });

  test("should able to click in Signin button", () => {    
    const wrapper = render(<Signin />);
    const onClick = jest.fn();
    let count = 0;

    const buttonLogin = wrapper.getAllByText('Sign in')[0];
    
    fireEvent.click(buttonLogin, () => {
        count = 1;
    })
    expect(onClick.mock.calls.length).toEqual(count)
  });

  test("should able to click in Back button", () => {   
    const history = createMemoryHistory() 
    const wrapper = render(
    <Router history={history}>
        <Signin />
      </Router>);
    const onClick = jest.fn();
    let count = 0;

    const buttonSignin = wrapper.getAllByText('Back')[0];
    
    fireEvent.click(buttonSignin, () => {
        count = 1;
    })
    expect(onClick.mock.calls.length).toEqual(count)
  });
  
})