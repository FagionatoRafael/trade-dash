import React from 'react';
import {cleanup, fireEvent, render, screen} from '@testing-library/react';
import Dash from './Dash';


afterEach(cleanup);

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: () => ({
        id: ''
    })
}))

// const mockChildComponent = jest.fn();
// jest.mock("../../Components/UserCard", () => (props: any) => {
//     mockChildComponent(props);
//     return <UserCard nameUser={''} valueUSDUser={0} valueGBPUser={0} exit={() => {}} />;
// });

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

//   test('Should render AccordionPastTrades component', () => {
//     const renderComponent = render(<Dash />);

//     expect(mockChildComponent).toHaveBeenCalledWith(
//     expect.objectContaining({
//         nameUser: '', 
//         valueUSDUser: 0, 
//         valueGBPUser: 0,
//          exit:() => {}
//     }));

//   })
 
})
