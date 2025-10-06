import Card from "../../../components/card.jsx"
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import React from "react";

describe('Card', () => {
    afterEach(cleanup);
    it('Check if the Card is rendered', () => {
        render(<Card title="Title" link="/" description={"Hi"}/>);

        expect(screen.getByText('Title')).toBeInTheDocument()

        const button = screen.getByTestId("descriptionButton")
        expect(button).toBeInTheDocument()
        expect(button).toBeVisible()

        expect(screen.getByRole('link')).toHaveAttribute('href', '/')
    });

    it('Check the if the Description is rendered on button click', () => {
        render(<Card title="Title" link="/" description={"Hi"}/>);

        fireEvent.click(screen.getByTestId("descriptionButton"));
        
        expect(screen.getByText('Hi')).toBeInTheDocument()
    });
});


