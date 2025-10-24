import Card from "../../components/Card.jsx"
import { cleanup, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from "react";


const mockedNavigate = jest.fn();

jest.mock('react-router', () => ({
    ...jest.requireActual('react-router'),
    useNavigate: () => mockedNavigate,
}));

describe('Card', () => {
    afterEach(cleanup);
    it('Check if the Card is rendered with the title', () => {
        render(<Card title="Title" link="/" description={"Hi"} />);

        expect(screen.getByText('Title')).toBeInTheDocument();
    });

    it('Check if the description is revealed on hovering', async () => {
        render(<Card title="Title" link="/" description={"Hi"} />);

        await userEvent.hover(screen.getByText('Title'));

        expect(screen.getByText('Hi')).toBeInTheDocument();

    });

    it('Check if the description is hidden on unhovering', async () => {
        render(<Card title="Title" link="/" description={"Hi"} />);

        await userEvent.hover(screen.getByText('Title'));
        expect(screen.getByText('Hi')).toBeInTheDocument()

        await userEvent.unhover(screen.getByText('Title'));
        expect(screen.queryByText('Hi')).toBeNull();

        expect(screen.getByText('Title')).toBeInTheDocument()

    });

    it('Check if clicking the card triggers navigation', async () => {
        render(<Card title="Title" link="/sample" description={"Hi"} />);

        const cardArea = screen.getByRole("button")
        expect(cardArea).toBeInTheDocument();

        await userEvent.click(cardArea);

        await waitFor(() => {
            expect(mockedNavigate).toHaveBeenCalled();
        });
    });
});


