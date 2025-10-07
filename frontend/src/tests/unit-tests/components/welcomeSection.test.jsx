import WelcomeSection from "../../../components/welcomeSection.jsx"
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import React from "react";

describe('WelcomeSection', () => {
    afterEach(cleanup);
    // Test to check the welcome word is on the screen for the user
    it('The welcomeSection component should display a banner with the Word Welome!', () => {
        render(<WelcomeSection />);

        expect(screen.getByText('Welcome!')).toBeInTheDocument()
        expect(screen.getByText('Welcome!')).toBeVisible()

    });

    // Test to check the welcome message is on the screen for the user and they are
    // having the welcome experience intended
    it('The welcomeSection component should display a banner with a welcome message', () => {
        render(<WelcomeSection />);

        expect(screen.getByText('Experience a day at work, take on challenges, and test your skills')).toBeInTheDocument()
        expect(screen.getByText('Experience a day at work, take on challenges, and test your skills')).toBeVisible()

    }); 
});

