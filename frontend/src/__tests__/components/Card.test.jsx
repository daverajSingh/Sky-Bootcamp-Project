import Card from "../../components/Card.jsx"
import { cleanup, fireEvent, render, screen } from '@testing-library/react';

import React from "react";
import { MemoryRouter, useNavigate } from 'react-router';


// Mock useNavigate hook
const mockedNavigate = jest.fn();

jest.mock('react-router', () => ({
    ...jest.requireActual('react-router'), // keep other exports intact
    useNavigate: () => mockedNavigate,
}));


describe('Card', () => {
    afterEach(cleanup);
    it('Check if the Card is rendered with the title, link, show description button', () => {
        render(<MemoryRouter>
            <Card title="Title" link="/" description={"Hi"} />
        </MemoryRouter>);

        expect(screen.getByText('Title')).toBeInTheDocument()

        const button = screen.getByTestId("showDescription")
        expect(button).toBeInTheDocument()
        expect(button).toBeVisible()

        expect(screen.getByTestId("linkButton")).toHaveAttribute('href', '/')
    });

    it('Check if the description and hide button is revealed on clicking plus button (show button)', () => {
        render(<MemoryRouter>
            <Card title="Title" link="/" description={"Hi"} />
        </MemoryRouter>);

        fireEvent.click(screen.getByTestId("showDescription"));

        expect(screen.getByText('Hi')).toBeInTheDocument()

        const button = screen.getByTestId("hideDescription")
        expect(button).toBeInTheDocument()
        expect(button).toBeVisible()
    });

    it('Check if the description is hidden on clicking hide description button', () => {
        render(
            <MemoryRouter>
                <Card title="Title" link="/" description={"Hi"} />
            </MemoryRouter>
        );

        fireEvent.click(screen.getByTestId("showDescription"));

        expect(screen.getByText('Hi')).toBeInTheDocument()
        fireEvent.click(screen.getByTestId("hideDescription"));

        expect(screen.getByText('Title')).toBeInTheDocument()
    });

    it('Check if the link button is working', () => {
        render(
            <MemoryRouter>
                <Card title="Title" link="/" description={"Hi"} />
            </MemoryRouter>
        );

        const linkButton = screen.getByTestId("linkButton")
        expect(linkButton).toBeInTheDocument()
        expect(linkButton).toBeVisible()
        expect(linkButton).toHaveAttribute('href', '/')
    });

    it('Check if clicking the card triggers navigation', () => {
        render(
            <MemoryRouter>
                <Card title="Title" link="/" description={"Hi"} />
            </MemoryRouter>
        );

        const linkButton = screen.getByTestId("linkButton");
        expect(linkButton).toBeInTheDocument();
        expect(linkButton).toBeVisible();
        expect(linkButton).toHaveAttribute('href', '/');

        // Simulate clicking the card (or button)
        fireEvent.click(linkButton);

        // Check if navigate was called with the right path
        expect(mockedNavigate).toHaveBeenCalledWith('/');
    });

    it('Check if the link button is not rendered when no link is provided', () => {
        render(
            <MemoryRouter>
                <Card title="Title" description={"Hi"} />
            </MemoryRouter>
        );

        expect(screen.queryByTestId("linkButton")).toBeNull();
    });

    it('Check if the description button is not rendered when no description is provided', () => {
        render(
            <MemoryRouter>
                <Card title="Title" link="/" />
            </MemoryRouter>
        );

        expect(screen.queryByTestId("showDescription")).toBeNull();
    });

});


