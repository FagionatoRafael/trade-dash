import React from 'react';
import {cleanup, render} from '@testing-library/react';
import UserCard from './UserCard';

afterEach(cleanup);

describe('UserCard component', () => {
  test('Should render component', () => {
    const renderComponente = render(
    <UserCard 
        nameUser={''} 
        valueUSDUser={0} 
        valueGBPUser={0} 
        exit={() => {}}         
    />);

    expect(renderComponente).toMatchSnapshot();
  })

  test('should has values in UserCard', async () => {
    const renderComponente = render(
        <UserCard 
            nameUser={''} 
            valueUSDUser={0} 
            valueGBPUser={0} 
            exit={() => {}}         
        />);
    
    const uservalues = await renderComponente.queryAllByText(` - $  | £ `)[0]

    expect(uservalues).toBeInTheDocument();
  })

})