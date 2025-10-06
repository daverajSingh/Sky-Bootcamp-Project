import Header from "../../../components/header.jsx"
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import React from "react";

describe('Header', () => {
    afterEach(cleanup);
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
});


