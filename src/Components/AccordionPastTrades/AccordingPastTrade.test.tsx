import React from 'react';
import {cleanup, render} from '@testing-library/react';
import AccordionPastTrades from './AccordionPastTrades';
import TablePastTrades from '../tablePastTrades/tablePastTrades'

afterEach(cleanup);

describe('AccordingPastTrade component', () => {
  test('Should render component', () => {
    const renderComponent = render(<AccordionPastTrades rowsPast={[]} />);

    expect(renderComponent).toMatchSnapshot();
  })

  test('should render component TablePastTrades', () => {
    const renderComponent = render(<TablePastTrades rowsPast={[]} />)

    expect(renderComponent).not.toBeUndefined()
  })
  
})