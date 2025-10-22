import Card from "../../components/Card.jsx"
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from "react";



// Mock useNavigate hook
const mockedNavigate = jest.fn();

jest.mock('react-router', () => ({
    ...jest.requireActual('react-router'),
    useNavigate: () => mockedNavigate,
}));

describe('Card', () => {
    afterEach(cleanup);
    it('Check if the Card is rendered with the title, link, show description button', () => {
        render(<Card title="Title" link="/" description={"Hi"} />);

        expect(screen.getByText('Title')).toBeInTheDocument();

        const button = screen.getByTestId("showDescription");
        expect(button).toBeInTheDocument();

        expect(screen.getByTestId("linkButton")).toHaveAttribute('href', '/');
    });

    it('Check if the description and hide button is revealed on clicking plus button (show button)', async () => {
        render(<Card title="Title" link="/" description={"Hi"} />);

        await userEvent.click(screen.getByTestId("showDescription"));

        expect(screen.getByText('Hi')).toBeInTheDocument();

        const button = screen.getByTestId("hideDescription");
        expect(button).toBeInTheDocument();
        expect(button).toBeVisible();
    });

    it('Check if the description is hidden on clicking hide description button', async () => {
        render(<Card title="Title" link="/" description={"Hi"} />);

        await userEvent.click(screen.getByTestId("showDescription"));

        expect(screen.getByText('Hi')).toBeInTheDocument()
        await userEvent.click(screen.getByTestId("hideDescription"));

        expect(screen.getByText('Title')).toBeInTheDocument()
    });

    it('Check if the link button is working', () => {
        render(<Card title="Title" link="/" description={"Hi"} />);

        const linkButton = screen.getByTestId("linkButton")
        expect(linkButton).toBeInTheDocument()
        expect(linkButton).toBeVisible()
        expect(linkButton).toHaveAttribute('href', '/')
    });

    it('Check if clicking the card triggers navigation', () => {
        render(<Card title="Title" link="/" description={"Hi"} />);

        const cardArea = screen.getByText('Title').closest('div');
        expect(cardArea).toBeInTheDocument();
        
        userEvent.click(cardArea);
        expect(mockedNavigate).toHaveBeenCalledWith('/');
    });

    it('Check if the link button is not rendered when no link is provided', () => {
        render(<Card title="Title" description={"Hi"} />);

        expect(screen.queryByTestId("linkButton")).toBeNull();
    });

    it('Check if the description button is not rendered when no description is provided', () => {
        render(<Card title="Title" link="/" />);

        expect(screen.queryByTestId("showDescription")).toBeNull();
    });

});


