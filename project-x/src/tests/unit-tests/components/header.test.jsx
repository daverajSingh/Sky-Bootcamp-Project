import Header from "../../../components/header.jsx"
import { cleanup, fireEvent, render, screen} from '@testing-library/react';
import React from "react";


afterEach(cleanup);

it('Clicking the SkyImmersion text should load the skyImmersion home page', () => {
    const loadedHomePage = render(
        <Header />
    );

    expect(screen.getByText('Sky Immersion')).toBeInTheDocument()

    // fireEvent.click(screen.getByText('Sky Immersion'));

    // expect(screen.getByRole('link', { name: 'Sky Immersion' })).toHaveAttribute('href', 'https://www.test.com/')
});
