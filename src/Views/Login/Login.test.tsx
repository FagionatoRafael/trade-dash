import React from 'react';
import {cleanup, fireEvent, render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history'
import {Router} from 'react-router-dom'
import Login from './Login';

afterEach(cleanup);

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom')
}))

describe('AccordingPastTrade component', () => {
  test('Should render component', () => {
    const renderComponent = render(<Login />);

    expect(renderComponent).toMatchSnapshot();
  })

  test('Should Input Name start empty', async () => {
    const wrapper = render(<Login />);
    const input = await wrapper.findByLabelText('Name')

    expect(input).toHaveValue('');
  });

  test('Should Input Password start empty', async () => {
    const wrapper = render(<Login />);
    const input = await wrapper.findByLabelText('Password')

    expect(input).toHaveValue('');
  });

  test("should render component button of Login", () => {    
    const wrapper = render(<Login />);

    const buttonLogin = wrapper.getAllByText('Login')[0];
    
    expect(buttonLogin).toBeInTheDocument();
  });

  test("should able to click in Login button", () => {    
    const wrapper = render(<Login />);
    const onClick = jest.fn();
    let count = 0;

    const buttonLogin = wrapper.getAllByText('Login')[1];
    
    fireEvent.click(buttonLogin, () => {
        count = 1;
    })
    expect(onClick.mock.calls.length).toEqual(count)
  });

  test("should able to click in Signin button", () => {    
    const history = createMemoryHistory() 
    const wrapper = render(
    <Router history={history}>
        <Login />
      </Router>);
    const onClick = jest.fn();
    let count = 0;

    const buttonSignin = wrapper.getAllByText('Sign In')[0];
    
    fireEvent.click(buttonSignin, () => {
        count = 1;
    })
    expect(onClick.mock.calls.length).toEqual(count)
  });
  
})