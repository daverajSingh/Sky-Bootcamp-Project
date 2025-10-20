import Header from '../../components/Header.jsx';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import React from "react";

jest.mock('../../components/AuthContext', () => ({
  useAuth: jest.fn(),
}));

jest.mock('../../components/AuthButton', () => jest.fn(() => <button>Mocked AuthButton</button>));
describe('Header', () => {
    afterEach(cleanup);
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('Clicking the SkyImmersion text should load the skyImmersion home page', () => {
        render(<Header />);

        expect(screen.getByText('Sky Immersion')).toBeInTheDocument()

        fireEvent.click(screen.getByText('Sky Immersion'));

        expect(screen.getByRole('link', { name: 'Sky Immersion' })).toHaveAttribute('href', '/')
    });

    it('Check if the login button is visible', () => {
        render(<Header />);

        expect(screen.getByRole("button")).toBeInTheDocument()
        expect(screen.getByRole("button")).toBeVisible()
    });

    it('Check if the Sky text is visible', () => {
        render(<Header />);

        expect(screen.getByText("Sky")).toBeInTheDocument()
        expect(screen.getByText("Sky")).toBeVisible()
    });

    
});


