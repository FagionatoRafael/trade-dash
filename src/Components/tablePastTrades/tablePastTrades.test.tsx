import React from 'react';
import {cleanup, render} from '@testing-library/react';
import TablePastTrades from './tablePastTrades';

afterEach(cleanup);

describe('tablePastTrades component', () => {
  test('Should render component', () => {
    const renderComponente = render(
    <TablePastTrades rowsPast={[]} />);

    expect(renderComponente).toMatchSnapshot();
  })

})