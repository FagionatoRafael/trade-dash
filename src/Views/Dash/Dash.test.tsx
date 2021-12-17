import React from 'react';
import {cleanup, fireEvent, render, screen} from '@testing-library/react';
import Dash from './Dash';
import UserCard from '../../Components/UserCard/UserCard';
import AccordionPastTrades from '../../Components/AccordionPastTrades/AccordionPastTrades';
import CardValues from '../../Components/CardValues/CardValues';


afterEach(cleanup);

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: () => ({
        id: ''
    })
}))

describe('Dash component', () => {
  test('Should render component', () => {
    const renderComponent = render(<Dash />);

    expect(renderComponent).toMatchSnapshot();
  })

  test('Should render CardValues component of POUND - DOLLAR', () => {
    const renderComponent = render(<Dash />);

    const title = renderComponent.getAllByText('POUND - DOLLAR')[0]

    expect(title).not.toBeUndefined()

  })

  test('Should render CardValues component of DOLLAR - POUND', () => {
    const renderComponent = render(<Dash />);

    const title = renderComponent.getAllByText('DOLLAR - POUND')[0]

    expect(title).not.toBeUndefined()

  })

  test('should render component UserCard', () => {
    const renderComponent = render(
    <UserCard 
      nameUser={''} 
      valueUSDUser={0} 
      valueGBPUser={0} 
      exit={() => {}}   
    />)

    expect(renderComponent).not.toBeUndefined()
  })

  test('should render component CardValues', () => {
    const renderComponent = render(
    <CardValues 
      title={''} 
      value={0} 
      valueChange={0} 
      label={''} 
      handle={async (value) => {}} 
      adornment={''} 
      adornmentSecond={''} 
      handleClick={() => {}} 
      helper={''} 
      disabled={false}    
    />)

    expect(renderComponent).not.toBeUndefined()
  })

  test('should render component AccordionPastTrades', () => {
    const renderComponent = render(
      <AccordionPastTrades rowsPast={[]}
    />)

    expect(renderComponent).not.toBeUndefined()
  })
})
